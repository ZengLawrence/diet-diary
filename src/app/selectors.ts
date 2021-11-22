import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { calcCaloriesDifference, calcCaloriesTotal } from "../model/calorieFunction";
import { calcMealsServingSummary, calcServingDifference } from "../model/servingFunction";
import { RootState } from "./store";

export const dateSelector = (state: RootState) => state.date;
export const editModeSelector = (state: RootState) => state.editMode;
export const mealStatesSelector = (state: RootState) => state.mealStates;
export const summaryTypeSelector = (state: RootState) => state.summaryType;
export const targetStateSelector = (state: RootState) => state.targetState;

export const editTargetSelector = createSelector(
  targetStateSelector,
  (targetState) => targetState.editTarget
)

export const targetSelector = createSelector(
  targetStateSelector,
  (targetState) => targetState.target
)

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