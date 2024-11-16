import { combineReducers } from "redux";
import date from "../features/day-page/dateSlice";
import editMode from "../features/day-page/editModeSlice";
import mealStates from "../features/day-page/mealStatesSlice";
import summaryType from "../features/day-page/summaryTypeSlice";
import targetState from "../features/target/targetStateSlice";
import savedMeals from "../features/saved-meal/savedMealsSlice";
import showSavedMeals from "../features/day-page/showSavedMealsSlice";
import warning from "../features/warning/warningSlice";
import savedMealState from "../features/saved-meal/savedMealStateSlice";


export default combineReducers(
  {
    date,
    summaryType,
    mealStates,
    editMode,
    targetState,
    savedMeals,
    showSavedMeals,
    warning,
    savedMealState,
  }
)
