import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { SavedFoodsLoader, SavedFoodsSaver } from "./savedFoods";
import { SavedFoods } from "./savedFoods";

describe("SavedFoods Class", () => {
  let loader: jest.Mocked<SavedFoodsLoader>;
  let saver: jest.Mocked<SavedFoodsSaver>;
  let savedFoods: SavedFoods;

  beforeEach(() => {
    loader = {
      load: jest.fn(),
    };
    saver = {
      save: jest.fn(),
    };
    savedFoods = new SavedFoods(loader, saver);
  });

  describe("add a food to saved foods", () => {
    it("should add a food to saved foods", () => {
      const existingFoods = [{ description: "existing food", serving: {} }];
      loader.load.mockReturnValueOnce(existingFoods);
      const newFood = { description: "new food", serving: {} };

      savedFoods.add(newFood);

      expect(saver.save).toHaveBeenCalledWith([newFood, ...existingFoods]);
    });
  });
});