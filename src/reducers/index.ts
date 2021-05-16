import { Action, ChangeTargetAction } from "../actions";
import { AppState } from "../model/AppState";
import { DEFAULT_TARGET, Target } from "../model/Target";
import { newMealState, mealStatesReducer } from "./meal-state";

function today() {
  return new Date().toLocaleDateString();
}

export function initialState(): AppState {
  return {
    date: today(),
    mealStates: [newMealState()],
    editMode: true,
    target: DEFAULT_TARGET,
    editTarget: false,
  };
}


function dateReducer(state: string, action: Action) {
  switch (action.type) {
    case 'new-day':
      return today();
    default:
      return state;
  }
}

function editModeReducer(state: boolean, action: Action) {
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

function targetReducer(state: Target, action: Action) {
  switch (action.type) {
    case 'new-day':
      return DEFAULT_TARGET;
    case 'change-target':
      return (action as ChangeTargetAction).target;
    default:
      return state;
  }
}


function editTargetReducer(state: boolean, action: Action) {
  switch (action.type) {
    case 'enter-edit-target':
      return true;
    case 'exit-edit-target':
      return false;
    default:
      return state;
  }
}

export function reducer(state: AppState, action: Action): AppState {
  return {
    date: dateReducer(state.date, action),
    mealStates: mealStatesReducer(state.mealStates, action),
    editMode: editModeReducer(state.editMode, action),
    target: targetReducer(state.target, action),
    editTarget: editTargetReducer(state.editTarget, action),
  }
}
