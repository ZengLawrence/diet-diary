import { combineReducers } from "redux";
import editMode from "../features/day-page/editModeSlice";
import summaryType from "../features/day-page/summaryTypeSlice";
import targetState from "../features/target/targetStateSlice";
import showSavedMeals from "../features/day-page/showSavedMealsSlice";
import warning from "../features/warning/warningSlice";
import pageOptions from "../features/day-page/pageOptionsSlice";
import dayPage from "../features/day-page/dayPageSlice";
import overlays from "../features/overlays/overlaysSlice";

export default combineReducers(
  {
    summaryType,
    editMode,
    targetState,
    showSavedMeals,
    warning,
    pageOptions,
    dayPage,
    overlays,
  }
)
