import { combineReducers } from "redux";
import editMode from "../features/day-page/editModeSlice";
import summaryType from "../features/day-page/summaryTypeSlice";
import targetState from "../features/target/targetStateSlice";
import savedMeals from "../features/saved-meal/savedMealsSlice";
import showSavedMeals from "../features/day-page/showSavedMealsSlice";
import warning from "../features/warning/warningSlice";
import savedMealState from "../features/saved-meal/savedMealStateSlice";
import customTargets from "../features/target/customTargetsSlice";
import history from "../features/history/historySlice";
import pageOptions from "../features/day-page/pageOptionsSlice";
import today from "../features/day-page/todaySlice";
import dayPage from "../features/day-page/dayPageSlice";

export default combineReducers(
  {
    summaryType,
    editMode,
    targetState,
    savedMeals,
    showSavedMeals,
    warning,
    savedMealState,
    customTargets,
    history,
    pageOptions,
    today,
    dayPage,
  }
)
