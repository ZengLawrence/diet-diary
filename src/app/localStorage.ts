import { Gender } from "../model/Target";
import { PreferencesLocalStorage } from "./preferencesLocalStorage";
import { RootState } from "./store";

type SerializedReduxState = RootState;

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

function syncGenderInPreference(gender: Gender): void {
  const preferencesLocalStorage = new PreferencesLocalStorage();
  const preference = preferencesLocalStorage.load();
  if (preference && !('gender' in preference)) {
    const newPreference = { ...preference, gender };
    preferencesLocalStorage.save(newPreference);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadState = (): any => {
  const state = loadReduxState();
  if (state === null) {
    return undefined;
  }
  syncGenderInPreference(state.targetState.gender);
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