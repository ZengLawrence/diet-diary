import { combineReducers } from "redux";
import date from "../features/day-page/dateSlice";
import editMode from "../features/day-page/editModeSlice";
import mealStates from "../features/day-page/mealStatesSlice";
import summaryType from "../features/day-page/summaryTypeSlice";
import targetState from "../features/target/targetStateSlice";
import savedMeals from "../features/save-meal/savedMealsSlice";

export default combineReducers(
  {
    date,
    summaryType,
    mealStates,
    editMode,
    targetState,
    savedMeals,
  }
)
