import { SavedMeal } from "../model/SavedMeal";

export interface SerializedSavedMeals {
  meals: SavedMeal[];
}

export function loadSavedMeals(): SerializedSavedMeals {
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

export function saveSavedMeals(savedMeals: SerializedSavedMeals): void {
  try {
    const serializedMeals = JSON.stringify(savedMeals);
    localStorage.setItem('savedMeals', serializedMeals);
  } catch {
    // ignore write errors
  }
}
