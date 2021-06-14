import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "./store";

export const diarySelector = createSelector(
  (state: RootState) => state.date,
  (state: RootState) => state.mealStates,
  (date, mealStates) => ({ date, meals: _.map(mealStates, 'meal') })
)