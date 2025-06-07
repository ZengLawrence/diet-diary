import { RootState } from "./store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    return state;
  } catch (e) {
    console.error("Error loading state from localStorage", e);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};