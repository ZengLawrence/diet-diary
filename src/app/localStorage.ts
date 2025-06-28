import { loadSavedMeals, saveSavedMeals } from "./savedMealLocalStorage";
import { RootState } from "./store";

type ReduxState = Omit<RootState, 'savedMeals'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isReduxState(state: any): state is ReduxState {
  return !state.savedMeals || !Array.isArray(state.savedMeals) || state.savedMeals.length === 0;
} 

function loadReduxState(): RootState | ReduxState | null {
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
  if (isReduxState(state)) {
    const savedMeals = loadSavedMeals();
    return { ...state, savedMeals: savedMeals.meals };
  }
  return state;
};

function removeSavedMeals(state: RootState): ReduxState {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { savedMeals: _ignored, ...rest } = state;
  return rest;
}

function saveReduxState(state: ReduxState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
}

export const saveState = (state: RootState) => {
  saveReduxState(removeSavedMeals(state));
  saveSavedMeals({
    meals: state.savedMeals,
  });
};