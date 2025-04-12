import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { calcCaloriesDifference, calcCaloriesTotal } from "../model/calorieFunction";
import { calcBestChoiceServingSummary, calcMealsServingSummary, calcOthersServingSummary, calcServingDifference } from "../model/servingFunction";
import { RootState } from "./store";
import { Gender, Target } from "../model/Target";

const dateSelector = (state: RootState) => state.date;
const editModeSelector = (state: RootState) => state.editMode;
export const mealStatesSelector = (state: RootState) => state.mealStates;
export const summaryTypeSelector = (state: RootState) => state.summaryType;
const targetStateSelector = (state: RootState) => state.targetState;
export const savedMealsSelector = (state: RootState) => state.savedMeals;
export const showSavedMealsSelector = (state: RootState) => state.showSavedMeals;
export const warningSelector = (state: RootState) => state.warning;
export const savedMealStateSelector = (state: RootState) => state.savedMealState;
export const customTargetsStateSelector = (state: RootState) => state.customTargets;

export interface DayPageState {
  date: string,
  editMode: boolean,
  targetState: {
    target: Target,
    unlimitedFruit: boolean,
  },
}

export const dayPageSelector: (state: RootState) => DayPageState = createSelector(
  dateSelector,
  editModeSelector,
  targetStateSelector,
  (date, editMode, targetState) => ({ 
      date, 
      editMode,
      targetState: {
        target: targetState.target,
        unlimitedFruit: targetState.unlimitedFruit,
      }
    })
);

export const unlimitedFruitSelector: (state: RootState) => boolean = createSelector(
  dayPageSelector,
  (dayPage) => dayPage.targetState.unlimitedFruit,
);

export const targetSelector = createSelector(
  targetStateSelector,
  (targetState) => targetState.target
)

export const genderSelector: (state: RootState) => Gender = createSelector(
  targetStateSelector,
  (targetState) => targetState.gender,
);

export const diarySelector = createSelector(
  dateSelector,
  mealStatesSelector,
  (date, mealStates) => ({ date, meals: _.map(mealStates, 'meal') })
)

export const mealsSelector = createSelector(
  mealStatesSelector,
  (mealStates) => _.map(mealStates, 'meal')
)

export const totalCaloriesSelector = createSelector(
  mealsSelector,
  (meals) => calcCaloriesTotal(meals)
)

export const totalServingSelector = createSelector(
  mealsSelector,
  (meals) => calcMealsServingSummary(meals)
)

export const calorieDifferenceSelector = createSelector(
  mealsSelector,
  targetSelector,
  (meals, target) => calcCaloriesDifference(meals, target.calorie)
)

export const servingDifferenceSelector = createSelector(
  mealsSelector,
  targetSelector,
  (meals, target) => calcServingDifference(meals, target.serving)
)

export const bestChoiceServingTotalSelector = createSelector(
  mealsSelector,
  (meals) => calcBestChoiceServingSummary(meals)
)

export const othersServingTotalSelector = createSelector(
  mealsSelector,
  (meals) => calcOthersServingSummary(meals)
)