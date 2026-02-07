import type { Food } from "../model/Food";
import type { SavedFoodsLoader, SavedFoodsSaver } from "../model/savedFoods";

export class SavedFoodLocalStorage implements SavedFoodsLoader, SavedFoodsSaver {
  private static readonly STORAGE_KEY = 'savedFoods';

  load(): Food[] {
    try {
      const savedFoodsJson = localStorage.getItem(SavedFoodLocalStorage.STORAGE_KEY);
      if (savedFoodsJson === null) {
        return [];
      }
      const parsed = JSON.parse(savedFoodsJson) as { foods: Food[] };
      return parsed.foods;
    } catch (e) {
      console.error("Error loading saved foods from localStorage", e);
      return [];
    }
  }

  save(foods: Food[]): void {
    try {
      const serializedFoods = JSON.stringify({ foods });
      localStorage.setItem(SavedFoodLocalStorage.STORAGE_KEY, serializedFoods);
    } catch {
      // ignore write errors
    }
  }
}