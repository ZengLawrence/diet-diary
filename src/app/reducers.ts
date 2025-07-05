import { combineReducers } from "redux";
import editMode from "../features/day-page/editModeSlice";
import summaryType from "../features/day-page/summaryTypeSlice";
import targetState from "../features/target/targetStateSlice";
import showSavedMeals from "../features/day-page/showSavedMealsSlice";
import warning from "../features/warning/warningSlice";
import customTargets from "../features/target/customTargetsSlice";
import pageOptions from "../features/day-page/pageOptionsSlice";
import dayPage from "../features/day-page/dayPageSlice";

export default combineReducers(
  {
    summaryType,
    editMode,
    targetState,
    showSavedMeals,
    warning,
    customTargets,
    pageOptions,
    dayPage,
  }
)
