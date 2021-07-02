import { combineReducers } from "redux";
import { Action, ChangeTargetAction } from "../actions";
import date from "../features/day-page/dateSlice";
import { DEFAULT_TARGET, Target } from "../model/Target";
import { mealStatesReducer } from "./meal-state";
import editMode from "../features/day-page/editModeSlice";

function targetReducer(state: Target = DEFAULT_TARGET, action: Action) {
  switch (action.type) {
    case 'change-target':
      return (action as ChangeTargetAction).target;
    default:
      return state;
  }
}

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
    target: targetReducer,
    editTarget: editTargetReducer,
  }
)
