import { Target } from "../model/Target";
import { saveCustomTargets } from "./customTargetsLocalStorage";
import { RootState } from "./store";

type SerializedReduxState = RootState | RootState & {customTargets: {targets: Target[]}};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasCustomTargets(state: any): state is RootState & {customTargets: {targets: Target[]}} {
  return ('customTargets' in state) 
    && Array.isArray(state.customTargets.targets) 
    && state.customTargets.targets.length > 0;
}

function loadReduxState(): SerializedReduxState | null {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading state from localStorage", e);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadState = (): any => {
  const state = loadReduxState();
  if (state === null) {
    return undefined;
  }
  if (hasCustomTargets(state)) {
    const {customTargets, ...rest} = state;
    saveCustomTargets(customTargets);
    return rest;
  }
  return state;
}

function saveReduxState(state: RootState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
}

export const saveState = (state: RootState) => {
  saveReduxState(state);
};