import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { calcCaloriesTotal } from "../model/calorieFunction";
import { RootState } from "./store";

const dateSelector = (state: RootState) => state.date;
const mealStatesSelector = (state: RootState) => state.mealStates;

export const diarySelector = createSelector(
  dateSelector,
  mealStatesSelector,
  (date, mealStates) => ({ date, meals: _.map(mealStates, 'meal') })
)

const mealsSelector = createSelector(
  mealStatesSelector,
  (mealStates) => _.map(mealStates, 'meal')
)

export const totalCaloriesSelector = createSelector(
  mealsSelector,
  (meals) => calcCaloriesTotal(meals)
)