import { RootState } from "./store";

function _loadState(): RootState | null {
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
  const state = _loadState();
  if (state === null) {
    return undefined;
  }
  return state;
};

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