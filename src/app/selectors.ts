import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { isToday, MealEditState, MealOptions } from "../features/day-page/pageOptionsSlice";
import { calcCaloriesDifference, calcCaloriesTotal } from "../model/calorieFunction";
import { DayPage } from "../model/diary";
import { Meal, Serving } from "../model/Food";
import { calcBestChoiceServingSummary, calcMealsServingSummary, calcOthersServingSummary, calcServingDifference } from "../model/servingFunction";
import { defaultGender, Gender, manTarget, Target, womanTarget } from "../model/Target";
import { RootState } from "./store";

const _editModeSelector = (state: RootState) => state.editMode;
export const summaryTypeSelector = (state: RootState) => state.summaryType;
const _targetStateSelector = (state: RootState) => state.targetState;
export const savedMealsSelector = (state: RootState) => state.savedMeals;
export const showSavedMealsSelector = (state: RootState) => state.showSavedMeals;
export const warningSelector = (state: RootState) => state.warning;
export const savedMealStateSelector = (state: RootState) => state.savedMealState;
export const customTargetsStateSelector = (state: RootState) => state.customTargets;
const _pageOptionsSelector = (state: RootState) => state.pageOptions;
const _dayPageSelector = (state: RootState) => state.dayPage;

interface ViewOptions {
  canEdit: boolean,
  isToday: boolean,
  allowEdit: boolean,
  canDownload: boolean,
  canAddNewDay: boolean,
  hasHistory: boolean,
}

export interface DayPageState {
  date: string,
  viewOptions: ViewOptions,
  target: Target & { unlimitedFruit: boolean },
  mealStates: MealState[],
}

export interface MealState {
  meal: Meal;
  editState?: MealEditState;
  foodEditIndex?: number;
  showMealSavedAlert?: boolean;
}

const _mealOptionsSelector: (state: RootState) => MealOptions = createSelector(
  _pageOptionsSelector,
  (pageOptions) => pageOptions.mealOptions
);

function applyOptions(mealOptions: MealOptions, mealIndex: number): Pick<MealState, 'editState' | 'foodEditIndex' | 'showMealSavedAlert'> {
  let mealState = undefined;
  switch (mealOptions.editState) {
    case "add":
      if (mealIndex === mealOptions.mealIndex) {
        mealState = {
          editState: mealOptions.editState,
        }
      }
      break;
    case "edit":
      if (mealIndex === mealOptions.mealIndex) {
        mealState = {
          editState: mealOptions.editState,
          foodEditIndex: mealOptions.foodIndex,
        }
      }
      break;
    default:
      if (mealIndex === mealOptions.showMealSavedAlertIndex) {
        mealState = {
          showMealSavedAlert: true,
        }
      }
      break;
  }
  return mealState || {
    editState: undefined,
  };
}

const _mealStatesSelector: (state: RootState) => MealState[] = createSelector(
  _dayPageSelector,
  _mealOptionsSelector,
  (today, mealOptions) => {
    const mealStatesWithOptions = _.map(today.meals, (meal, mealIndex) => ({
      meal,
      ...applyOptions(mealOptions, mealIndex),
    }));

    // set last meal in add state if meal index is -1
    if (mealOptions.editState === "add" && mealOptions.mealIndex === -1) {
      const lastMealIndex = mealStatesWithOptions.length - 1;
      mealStatesWithOptions[lastMealIndex].editState = "add";
    }
    return mealStatesWithOptions;
  }
);

const _todayViewOptionsSelector: (state: RootState) => ViewOptions = createSelector(
  _editModeSelector,
  _mealStatesSelector,
  _pageOptionsSelector,
  (editMode, mealStates, pageOptions) => ({
    canEdit: editMode,
    isToday: true,
    allowEdit: true,
    canDownload: hasAtLeastOneFood(meals(mealStates)),
    canAddNewDay: !editMode,
    hasHistory: pageOptions.hasHistory,
  })
);

const _todayStateSelector: (state: RootState) => DayPageState = createSelector(
  _dayPageSelector,
  _todayViewOptionsSelector,
  _mealStatesSelector,
  (today, viewOptions, mealStates) => ({
    date: today.date,
    viewOptions,
    target: today.target,
    mealStates,
  })
);

function toMealState(meal: Meal): MealState {
  return ({
    meal
  });
}

function toDayPageState(dayHistory: DayPage): DayPageState {
  return ({
    date: dayHistory.date,
    viewOptions: {
      canEdit: false,
      isToday: false,
      allowEdit: false,
      canDownload: hasAtLeastOneFood(dayHistory.meals),
      canAddNewDay: false,
      hasHistory: true,
    },
    target: dayHistory.target,
    mealStates: dayHistory.meals.map(toMealState),
  });
}

const _currentDateSelector: (state: RootState) => string | "today" = createSelector(
  _pageOptionsSelector,
  (pageOptions) => pageOptions.currentDate,
);

export const dayPageSelector: (state: RootState) => DayPageState = createSelector(
  _currentDateSelector,
  _todayStateSelector,
  _dayPageSelector,
  (currentDate, today, history) => isToday(currentDate) ? today : toDayPageState(history),
);

export const viewOptionsSelector: (state: RootState) => ViewOptions = createSelector(
  dayPageSelector,
  (dayPage) => dayPage.viewOptions,
);

export const unlimitedFruitSelector: (state: RootState) => boolean = createSelector(
  dayPageSelector,
  (dayPage) => dayPage.target.unlimitedFruit,
);

export const targetSelector: (state: RootState) => Target = createSelector(
  dayPageSelector,
  (dayPage) => dayPage.target
);

export const genderSelector: (state: RootState) => Gender = createSelector(
  _targetStateSelector,
  (targetState) => defaultGender(targetState.gender),
);

export const mealStatesSelector: (state: RootState) => MealState[] = createSelector(
  dayPageSelector,
  (dayPage) => dayPage.mealStates,
);

export const diarySelector: (state: RootState) => { date: string, meals: Meal[] } = createSelector(
  dayPageSelector,
  (dayPage) => ({
    date: dayPage.date,
    meals: _.map(dayPage.mealStates, 'meal')
  })
);

export const mealsSelector: (state: RootState) => Meal[] = createSelector(
  mealStatesSelector,
  (mealStates) => _.map(mealStates, 'meal')
)

export const totalCaloriesSelector: (state: RootState) => number = createSelector(
  mealsSelector,
  (meals) => calcCaloriesTotal(meals)
)

export const totalServingSelector: (state: RootState) => Serving = createSelector(
  mealsSelector,
  (meals) => calcMealsServingSummary(meals)
)

export const calorieDifferenceSelector: (state: RootState) => number = createSelector(
  mealsSelector,
  targetSelector,
  (meals, target) => calcCaloriesDifference(meals, target.calorie)
)

export const servingDifferenceSelector: (state: RootState) => Serving = createSelector(
  mealsSelector,
  targetSelector,
  (meals, target) => calcServingDifference(meals, target.serving)
)

export const bestChoiceServingTotalSelector: (state: RootState) => Serving = createSelector(
  mealsSelector,
  (meals) => calcBestChoiceServingSummary(meals)
)

export const othersServingTotalSelector: (state: RootState) => Serving = createSelector(
  mealsSelector,
  (meals) => calcOthersServingSummary(meals)
)

export const historyDaysProgressSelector: (state: RootState) => { daysRemaining: number, totalDays: number } = createSelector(
  _pageOptionsSelector,
  (pageOptions) => {
    return pageOptions.progress;
  }
);

export const targetsSelector: (state: RootState) => Target[] = createSelector(
  genderSelector,
  customTargetsStateSelector,
  (gender, customTargets) => {
    const allTargets = customTargets.targets;
    if (gender == "woman") {
      return _.filter(allTargets, womanTarget);
    } else {
      return _.filter(allTargets, manTarget);
    }
  }
);

function hasAtLeastOneFood(meals: Meal[]) {
  return _.size(meals) > 0
    && _.size(meals[0].foods) > 0;
}

function meals(mealStates: MealState[]) {
  return _.map(mealStates, 'meal');
}