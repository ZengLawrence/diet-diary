import { combineReducers } from "redux";
import { Action } from "../actions";
import date from "../features/day-page/dateSlice";
import { mealStatesReducer } from "./meal-state";
import editMode from "../features/day-page/editModeSlice";
import target from "../features/target/targetSlice";

function editTargetReducer(state: boolean = false, action: Action) {
  switch (action.type) {
    case 'enter-edit-target':
      return true;
    case 'exit-edit-target':
      return false;
    default:
      return state;
  }
}

export const rootReducer = combineReducers(
  {
    date,
    mealStates: mealStatesReducer,
    editMode,
    target,
    editTarget: editTargetReducer,
  }
)
