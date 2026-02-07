import { describe, expect, it, jest } from "@jest/globals";
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
  const mockSuggestions = {
    addSuggestion: jest.fn(),
    addSuggestions: jest.fn(),
    removeSuggestion: jest.fn()
  };

  describe("add a food to saved foods", () => {
    it("should add a food to saved foods with latest in the beginning, and add to suggestions", () => {
      const existingFoods = [{ description: "existing food", serving: {} }];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence, mockSuggestions);
      const newFood = { description: "new food", serving: {} };

      savedFoods.add(newFood);

      expect(savedFoods.getAll()).toEqual([newFood, ...existingFoods]);
      expect(mockSuggestions.addSuggestion).toHaveBeenCalledWith(newFood);
    });
  });

  describe("init", () => {
    it("should add all saved foods to suggestions", () => {
      const existingFoods = [
        { description: "existing food 1", serving: {} },
        { description: "existing food 2", serving: {} }
      ];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence, mockSuggestions);

      savedFoods.init();

      expect(mockSuggestions.addSuggestions).toHaveBeenCalledWith(existingFoods);
    });
  });

});