import { combineReducers } from "redux";
import { Action, ChangeTargetAction } from "../actions";
import date, { newDay } from "../features/day-page/dateSlice";
import { DEFAULT_TARGET, Target } from "../model/Target";
import { mealStatesReducer } from "./meal-state";

function editModeReducer(state: boolean = true, action: Action) {
  switch (action.type) {
    case newDay.type:
    case 'enter-edit-mode':
      return true;
    case 'exit-edit-mode':
      return false;
    default:
      return state;
  }
}

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
    editMode: editModeReducer,
    target: targetReducer,
    editTarget: editTargetReducer,
  }
)
