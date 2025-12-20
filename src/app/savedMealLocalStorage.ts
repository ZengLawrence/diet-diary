import type { SavedMeal } from "../model/SavedMeal";
import type { SavedMealsLoader, SavedMealsSaver } from "../model/savedMeals";

interface SerializedSavedMeals {
  meals: SavedMeal[];
}

function loadSavedMeals(): SerializedSavedMeals {
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

function saveSavedMeals(savedMeals: SerializedSavedMeals): void {
  try {
    const serializedMeals = JSON.stringify(savedMeals);
    localStorage.setItem('savedMeals', serializedMeals);
  } catch {
    // ignore write errors
  }
}

export class SavedMealsLocalStorage implements SavedMealsLoader, SavedMealsSaver {
  load(): SavedMeal[] {
    return loadSavedMeals().meals;
  }

  save(meals: SavedMeal[]): void {
    saveSavedMeals({ meals });
  }
}