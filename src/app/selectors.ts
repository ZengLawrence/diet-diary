import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { calcCaloriesDifference, calcCaloriesTotal } from "../model/calorieFunction";
import { Meal, Serving } from "../model/Food";
import { calcBestChoiceServingSummary, calcMealsServingSummary, calcOthersServingSummary, calcServingDifference } from "../model/servingFunction";
import { Gender, Target, defaultGender, manTarget, womanTarget } from "../model/Target";
import { RootState } from "./store";
import { DayHistory, History, isToday } from "../features/history/historySlice";
import { MealEditState, MealOptions } from "../features/day-page/pageOptionsSlice";

const _dateSelector = (state: RootState) => state.date;
const _editModeSelector = (state: RootState) => state.editMode;
const _mealStatesSelector = (state: RootState) => state.mealStates;
export const summaryTypeSelector = (state: RootState) => state.summaryType;
const _targetStateSelector = (state: RootState) => state.targetState;
export const savedMealsSelector = (state: RootState) => state.savedMeals;
export const showSavedMealsSelector = (state: RootState) => state.showSavedMeals;
export const warningSelector = (state: RootState) => state.warning;
export const savedMealStateSelector = (state: RootState) => state.savedMealState;
export const customTargetsStateSelector = (state: RootState) => state.customTargets;
const _historySelector = (state: RootState) => state.history;
const _pageOptionsSelector = (state: RootState) => state.pageOptions;

interface ViewOptions {
  canEdit: boolean,
  isToday: boolean,
  allowEdit: boolean,
  canDownload: boolean,
  canAddNewDay: boolean,
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

const _mealStatesWithOptionsSelector:  (state: RootState) => MealState[] = createSelector( 
  _mealStatesSelector,
  _mealOptionsSelector,
  (mealStates, mealOptions) => {
    const mealStatesWithOptions = _.map(mealStates, (mealState, mealIndex) => ({
      ...mealState,
      editState: (mealIndex === mealOptions.mealIndex) ? mealOptions.editState : undefined,
      foodEditIndex: (mealIndex === mealOptions.mealIndex) ? mealOptions.foodIndex : -1,
      showMealSavedAlert: mealIndex === mealOptions.showMealSavedAlertIndex,
    }));

    // set last meal in add state if meal index is -1
    if (mealOptions.editState === "add" && mealOptions.mealIndex === -1) {
      const lastMealIndex = mealStatesWithOptions.length - 1;
      mealStatesWithOptions[lastMealIndex].editState = "add";
    }
    return mealStatesWithOptions;
  }
);

const _todaySelector: (state: RootState) => DayPageState = createSelector(
  _dateSelector,
  _editModeSelector,
  _targetStateSelector,
  _mealStatesWithOptionsSelector,
  (date, editMode, targetState, mealStates) => ({
    date,
    viewOptions: {
      canEdit: editMode,
      isToday: true,
      allowEdit: true,
      canDownload: hasAtLeastOneFood(meals(mealStates)),
      canAddNewDay: !editMode,
    },
    target: {
      ...targetState.target,
      unlimitedFruit: targetState.unlimitedFruit
    },
    mealStates,
  })
);

function toMealState(meal: Meal): MealState {
  return ({
    meal
  });
}

function toDayPage(dayHistory: DayHistory): DayPageState {
  return ({
    date: dayHistory.date,
    viewOptions: {
      canEdit: false,
      isToday: false,
      allowEdit: false,
      canDownload: hasAtLeastOneFood(dayHistory.meals),
      canAddNewDay: false,
    },
    target: dayHistory.target,
    mealStates: dayHistory.meals.map(toMealState),
  });
}

const _isTodaySelector: (state: RootState) => boolean = createSelector(
  _historySelector,
  (history) => isToday(history.dateIndex),
);

function getDay(history: History): DayPageState {
  const i = history.dateIndex;
  const days = history.days;
  if (0 <= i && i < days.length) {
    return toDayPage(history.days[history.dateIndex]);
  } else {
    return toDayPage(history.days[0]);
  }
}

export const dayPageSelector: (state: RootState) => DayPageState = createSelector(
  _isTodaySelector,
  _historySelector,
  _todaySelector,
  (isToday, history, dayPage) => isToday ? dayPage : getDay(history),
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
  _historySelector,
  (history) => {
    const totalDays = history.days.length;
    const daysRemaining = totalDays - (history.dateIndex + 1);
    return { daysRemaining, totalDays };
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