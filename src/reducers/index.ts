import { combineReducers } from "redux";
import date from "../features/day-page/dateSlice";
import editMode from "../features/day-page/editModeSlice";
import mealStates from "../features/day-page/mealStatesSlice";
import editTarget from "../features/target/editTargetSlice";
import target from "../features/target/targetSlice";

export const rootReducer = combineReducers(
  {
    date,
    mealStates,
    editMode,
    target,
    editTarget,
  }
)
