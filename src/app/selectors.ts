import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { MealState } from "../features/day-page/mealStatesSlice";
import { calcCaloriesDifference, calcCaloriesTotal } from "../model/calorieFunction";
import { Meal, Serving } from "../model/Food";
import { calcBestChoiceServingSummary, calcMealsServingSummary, calcOthersServingSummary, calcServingDifference } from "../model/servingFunction";
import { Gender, Target } from "../model/Target";
import { RootState } from "./store";

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

export interface DayPageState {
  date: string,
  editMode: boolean,
  target: Target & { unlimitedFruit: boolean },
  mealStates: MealState[],
}

export const dayPageSelector: (state: RootState) => DayPageState = createSelector(
  _dateSelector,
  _editModeSelector,
  _targetStateSelector,
  _mealStatesSelector,
  (date, editMode, targetState, mealStates) => ({
    date,
    editMode,
    target: {
      ...targetState.target,
      unlimitedFruit: targetState.unlimitedFruit
    },
    mealStates,
  })
);

export const dateSelector: (state: RootState) => string = createSelector(
  dayPageSelector,
  (dayPage) => dayPage.date,
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
  (targetState) => targetState.gender,
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