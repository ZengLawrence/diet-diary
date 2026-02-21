import { combineReducers } from "redux";
import dayPage from "../features/day-page/dayPageSlice";
import editMode from "../features/day-page/editModeSlice";
import pageOptions from "../features/day-page/pageOptionsSlice";
import summaryType from "../features/day-page/summaryTypeSlice";
import overlays from "../features/overlays/overlaysSlice";
import targetState from "../features/target/targetStateSlice";
import warning from "../features/warning/warningSlice";

export default combineReducers(
  {
    summaryType,
    editMode,
    targetState,
    warning,
    pageOptions,
    dayPage,
    overlays,
  }
)
