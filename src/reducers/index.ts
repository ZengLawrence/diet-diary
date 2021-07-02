import { combineReducers } from "redux";
import date from "../features/day-page/dateSlice";
import editMode from "../features/day-page/editModeSlice";
import editTarget from "../features/target/editTargetSlice";
import target from "../features/target/targetSlice";
import { mealStatesReducer } from "./meal-state";

export const rootReducer = combineReducers(
  {
    date,
    mealStates: mealStatesReducer,
    editMode,
    target,
    editTarget,
  }
)
