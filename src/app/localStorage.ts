import { SavedMeal } from "../model/SavedMeal";
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

function loadSavedMeals(): {meals:SavedMeal[]} {
  try {
    const serializedMeals = localStorage.getItem('savedMeals');
    if (serializedMeals === null) {
      return { meals: [] };
    }
    return JSON.parse(serializedMeals);
  } catch (e) {
    console.error("Error loading saved meals from localStorage", e);
    return { meals: [] };
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
  const { savedMeals: _ignored, ...rest } = state;
  return rest;
}

function saveSavedMeals(savedMeals: {meals: SavedMeal[]}) {
  try {
    const serializedMeals = JSON.stringify(savedMeals);
    localStorage.setItem('savedMeals', serializedMeals);
  } catch {
    // ignore write errors
  }
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