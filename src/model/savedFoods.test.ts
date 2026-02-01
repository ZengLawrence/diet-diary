import { describe, expect, it } from "@jest/globals";
import type { SavedFoodsLoader, SavedFoodsSaver } from "./savedFoods";
import { SavedFoods } from "./savedFoods";
import type { Food } from "./Food";

class InMemoryPersistence implements SavedFoodsLoader, SavedFoodsSaver {
  private foods: Food[];

  constructor(initialFoods: Food[] = []) {
    this.foods = initialFoods;
  }

  load(): Food[] {
    return this.foods;
  }
  save(foods: Food[]): void {
    this.foods = foods;
  }
}

describe("SavedFoods Class", () => {
  describe("add a food to saved foods", () => {
    it("should add a food to saved foods with latest in the beginning", () => {
      const existingFoods = [{ description: "existing food", serving: {} }];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence);
      const newFood = { description: "new food", serving: {} };

      savedFoods.add(newFood);

      expect(savedFoods.getAll()).toEqual([newFood, ...existingFoods]);
    });
  });
});