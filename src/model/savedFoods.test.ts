import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { SavedFoodsLoader, SavedFoodsSaver } from "./savedFoods";
import { SavedFoods } from "./savedFoods";
import type { Food } from "./Food";

class InMemoryPersistence implements SavedFoodsLoader, SavedFoodsSaver {
  private foods: Food[];

  constructor(initialFoods: Food[] = []) {
    this.foods = [...initialFoods];
  }

  load(): Food[] {
    return this.foods;
  }
  save(foods: Food[]): void {
    this.foods = [...foods];
  }
}

describe("SavedFoods Class", () => {
  const mockSuggestions = {
    addSuggestion: jest.fn(),
    addSuggestions: jest.fn(),
    removeSuggestion: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

    it("should add a food to saved foods and suggestions, removing duplicates in saved foods", () => {
      const existingFoods = [{ description: "existing food", serving: {} }];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence, mockSuggestions);
      const newFood = { description: "existing food", serving: { fat: 1 } };

      savedFoods.add(newFood);

      expect(savedFoods.getAll()).toEqual([newFood]);
      expect(mockSuggestions.addSuggestion).toHaveBeenCalledWith(newFood);
    });
  });

  describe("addAll foods to saved foods", () => {
    it("should add foods to saved foods with latest in the beginning, and add to suggestions", () => {
      const existingFoods = [{ description: "existing food", serving: {} }];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence, mockSuggestions);
      const newFoods = [
        { description: "new food 1", serving: {} },
        { description: "new food 2", serving: {} }
      ];

      savedFoods.addAll(newFoods);

      expect(savedFoods.getAll()).toEqual([...newFoods, ...existingFoods]);
      expect(mockSuggestions.addSuggestion).toHaveBeenCalledWith(newFoods[0]);
      expect(mockSuggestions.addSuggestion).toHaveBeenCalledWith(newFoods[1]);
    });

    it("should add foods to saved foods and suggestions, removing duplicates in saved foods", () => {
      const existingFoods = [{ description: "existing food", serving: {} }];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence, mockSuggestions);
      const newFoods = [
        { description: "existing food", serving: { fat: 1 } },
        { description: "new food", serving: {} }
      ];

      savedFoods.addAll(newFoods);

      expect(savedFoods.getAll()).toEqual([newFoods[0], newFoods[1]]);
      expect(mockSuggestions.addSuggestion).toHaveBeenCalledWith(newFoods[0]);
      expect(mockSuggestions.addSuggestion).toHaveBeenCalledWith(newFoods[1]);
    });
  });

  describe("remove a food from saved foods", () => {
    it("should remove a food from saved foods and suggestions", () => {
      const existingFoods = [
        { description: "food to remove", serving: {} },
        { description: "other food", serving: {} }
      ];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence, mockSuggestions);
      const foodToRemove = { description: "food to remove", serving: {} };

      savedFoods.remove(foodToRemove);

      expect(savedFoods.getAll()).toEqual([existingFoods[1]]);
      expect(mockSuggestions.removeSuggestion).toHaveBeenCalledWith(foodToRemove);
    });

    it("should do nothing if the food to remove is not in saved foods", () => {
      const existingFoods = [{ description: "existing food", serving: {} }];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence, mockSuggestions);
      const nonExistingFood = { description: "non-existing food", serving: {} };

      savedFoods.remove(nonExistingFood);

      expect(savedFoods.getAll()).toEqual(existingFoods);
      expect(mockSuggestions.removeSuggestion).not.toHaveBeenCalled();
    });
  });

  describe("removeAll foods from saved foods", () => {
    it("should remove foods from saved foods and suggestions", () => {
      const existingFoods = [
        { description: "food to remove 1", serving: {} },
        { description: "food to remove 2", serving: {} },
        { description: "other food", serving: {} }
      ];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence, mockSuggestions);
      const foodsToRemove = [
        { description: "food to remove 1", serving: {} },
        { description: "food to remove 2", serving: {} }
      ];

      savedFoods.removeAll(foodsToRemove);

      expect(savedFoods.getAll()).toEqual([existingFoods[2]]);
      expect(mockSuggestions.removeSuggestion).toHaveBeenCalledWith(foodsToRemove[0]);
      expect(mockSuggestions.removeSuggestion).toHaveBeenCalledWith(foodsToRemove[1]);
    });

    it("should do nothing if the foods to remove are not in saved foods", () => {
      const existingFoods = [{ description: "existing food", serving: {} }];
      const persistence = new InMemoryPersistence(existingFoods);
      const savedFoods = new SavedFoods(persistence, persistence, mockSuggestions);
      const nonExistingFoods = [
        { description: "non-existing food 1", serving: {} },
        { description: "non-existing food 2", serving: {} }
      ];

      savedFoods.removeAll(nonExistingFoods);

      expect(savedFoods.getAll()).toEqual(existingFoods);
      expect(mockSuggestions.removeSuggestion).not.toHaveBeenCalled();
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