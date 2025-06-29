import { SavedMeal } from "../model/SavedMeal";
import { saveSavedMeals } from "./savedMealLocalStorage";
import { RootState } from "./store";

type SerializedReduxState = RootState | RootState & { savedMeals: SavedMeal[] };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasSavedMealsProperty(state: any): state is RootState & { savedMeals: SavedMeal[] } {
  return state.savedMeals && Array.isArray(state.savedMeals);
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
  if (hasSavedMealsProperty(state)) {
    saveSavedMeals({
      meals: state.savedMeals,
    });
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