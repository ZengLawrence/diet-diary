import { combineReducers } from "redux";
import date from "../features/day-page/dateSlice";
import editMode from "../features/day-page/editModeSlice";
import mealStates from "../features/day-page/mealStatesSlice";
import summaryType from "../features/day-page/summaryTypeSlice";
import target from "../features/target/targetSlice";
import targetState from "../features/target/targetStateSlice";

export default combineReducers(
  {
    date,
    summaryType,
    mealStates,
    editMode,
    target,
    targetState,
  }
)
