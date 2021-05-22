import { combineReducers } from "redux";
import { Action, ChangeTargetAction } from "../actions";
import { today } from "../model/AppState";
import { DEFAULT_TARGET, Target } from "../model/Target";
import { mealStatesReducer } from "./meal-state";

function dateReducer(state: string = "05/22/2021", action: Action) {
  switch (action.type) {
    case 'new-day':
      return today();
    default:
      return state;
  }
}

function editModeReducer(state: boolean = true, action: Action) {
  switch (action.type) {
    case 'new-day':
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
    case 'new-day':
      return DEFAULT_TARGET;
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
    date: dateReducer,
    mealStates: mealStatesReducer,
    editMode: editModeReducer,
    target: targetReducer,
    editTarget: editTargetReducer,
  }
)
