import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { Food } from "./Food";
import type { SavedMeal } from "./SavedMeal";
import type { SavedMealsLoader, SavedMealsSaver} from "./savedMeals";
import { SavedMeals, search } from "./savedMeals";
import type { Suggestions } from "./suggestions";
import type { Today } from "./today";
import { mock } from "jest-mock-extended";

// Helper: minimal valid Food for tests
const minimalFood: Food = { description: "desc", serving: {} };

// Minimal Today mock for constructor
const minimalTarget = {
  calorie: 0,
  serving: {
    vegetable: 0,
    fruit: 0,
    carbohydrate: 0,
    proteinDiary: 0,
    fat: 0,
    sweet: 0,
  },
  unlimitedFruit: false,
};
const minimalDayPage = { date: '', target: minimalTarget, meals: [] };

// Patch createMockToday to return a Jest mock function for addSavedMeal
const createMockToday = (): Today & { addSavedMeal: jest.Mock } => {
  const addSavedMeal = jest.fn();
  return {
    loader: { load: jest.fn(() => minimalDayPage) },
    saver: { save: jest.fn() },
    diaryHistory: { add: jest.fn(() => []) },
    _saveToday: jest.fn(),
    _loadToday: jest.fn(() => minimalDayPage),
    currentDay: jest.fn(() => minimalDayPage),
    newDay: jest.fn(() => ({})),
    addMeal: jest.fn(() => ({})),
    addSavedMeal,
    deleteMeal: jest.fn(() => ({})),
    addFood: jest.fn(() => ({})),
    updateFood: jest.fn(() => ({})),
    deleteFood: jest.fn(() => ({})),
    updateTarget: jest.fn(() => ({})),
    toggleUnlimitedFruit: jest.fn(() => ({})),
  } as unknown as Today & { addSavedMeal: jest.Mock };
};

// Jest mock for Today class


describe("search", () => {
  describe("by description", () => {
    const meals = [
      {
        foods: [
          { description: "Grilled Chicken Breast", serving: {} },
          { description: "Steamed Broccoli", serving: {} },
          { description: "Brown Rice", serving: {} },
        ],
      },
      {
        foods: [
          { description: "Beef Burger", serving: {} },
          { description: "French Fries", serving: {} },
        ],
      },
      {
        foods: [
          { description: "Salmon Sushi Roll", serving: {} },
          { description: "Miso Soup", serving: {} },
        ],
      },
      {
        foods: [
          { description: "Chicken Caesar Salad", serving: {} },
        ],
      },
    ];

    it("finds meals containing all search words in any food description", () => {
      expect(search.byDescription(meals, "chicken")).toHaveLength(2);
      expect(search.byDescription(meals, "chicken grilled")).toHaveLength(1);
      expect(search.byDescription(meals, "broccoli")).toHaveLength(1);
      expect(search.byDescription(meals, "beef burger")).toHaveLength(1);
      expect(search.byDescription(meals, "salmon roll")).toHaveLength(1);
      expect(search.byDescription(meals, "miso soup")).toHaveLength(1);
      expect(search.byDescription(meals, "caesar salad")).toHaveLength(1);
    });

    it("is case-insensitive and ignores word order", () => {
      expect(search.byDescription(meals, "CHICKEN")).toHaveLength(2);
      expect(search.byDescription(meals, "salad caesar")).toHaveLength(1);
      expect(search.byDescription(meals, "rice brown")).toHaveLength(1);
    });

    it("returns empty array if no meal matches all words", () => {
      expect(search.byDescription(meals, "tofu")).toHaveLength(0);
      expect(search.byDescription(meals, "chicken beef")).toHaveLength(0);
      expect(search.byDescription(meals, "pizza")).toHaveLength(0);
    });

    it("returns all meals if search term is empty", () => {
      expect(search.byDescription(meals, "")).toHaveLength(meals.length);
    });
  });
});

// Jest mocks for dependent interfaces
const createMockLoader = (meals: SavedMeal[]): SavedMealsLoader => ({
  load: jest.fn(() => meals),
});

const createMockSaver = (): jest.Mocked<SavedMealsSaver> => {
  return {
    save: jest.fn(),
  };
};

const createMockListener = () => ({
  added: jest.fn(),
  deleted: jest.fn(),
});

// Helper to get the last saved meals from the mock
const getSavedMeals = (saver: jest.Mocked<SavedMealsSaver>): SavedMeal[] | undefined => {
  const saveFnCalls = saver.save.mock.calls; 
  if (saveFnCalls.length > 0) {
    const lastCall = saveFnCalls[saveFnCalls.length - 1];
    const savedMeals = lastCall[0];
    return savedMeals;
  }
  return undefined;
};

describe("SavedMeals class", () => {
  const suggestions: Suggestions = mock<Suggestions>();
  const mealA: SavedMeal = { foods: [{ ...minimalFood, description: "A" }] };
  const mealB: SavedMeal = { foods: [{ ...minimalFood, description: "B" }] };

  describe("init", () => {
    it("loads meals from loader and adds them to suggestions", () => {
      const meals = [mealA, mealB];
      const loader = createMockLoader(meals);
      const saver = createMockSaver();
      const today = createMockToday();
      const savedMeals = new SavedMeals(loader, saver, today, suggestions);
      savedMeals.init();
      
      expect(loader.load).toHaveBeenCalled();
      expect(suggestions.addSuggestions).toHaveBeenCalledWith(meals);
      expect(savedMeals).toBeInstanceOf(SavedMeals);
    });
  });
  
  describe("add a meal", () => {
    beforeEach(() => {
      (suggestions.addSuggestion as jest.Mock).mockClear();
    });

    it("adds a meal and saves the new list", () => {
      const loader = createMockLoader([mealA]);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday(), suggestions);
      const result = savedMeals.add(mealB);
      expect(result[0]).toBe(mealB);
      expect(result[1]).toBe(mealA);
      expect(getSavedMeals(saver)).toEqual([mealB, mealA]);
      expect(suggestions.addSuggestion).toHaveBeenCalledWith(mealB);
    });

    it("does not exceed max saved count", () => {
      const manyMeals = Array(200).fill(mealA) as SavedMeal[];
      const loader = createMockLoader(manyMeals);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday(), suggestions);
      const result = savedMeals.add(mealB);
      expect(result.length).toBe(200);
      expect(result[0]).toBe(mealB);
      expect(getSavedMeals(saver)?.length).toBe(200);
      expect(suggestions.addSuggestion).toHaveBeenCalledWith(mealB);
    });

    it("delete multi-food meal first when exceed max saved count", () => {
      const multiFoodMeal: SavedMeal = {
        foods: [
          { ...minimalFood, description: "food 1" },
          { ...minimalFood, description: "food 2" },
        ]
      }
      const singleFoodMeals = Array<SavedMeal>(199).fill(mealA);
      const manyMeals = [multiFoodMeal, ...singleFoodMeals];
      const loader = createMockLoader(manyMeals);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday(), suggestions);
      const result = savedMeals.add(mealB);
      expect(result.length).toBe(200);
      expect(result[0]).toBe(mealB);
      expect(result.slice(1)).toEqual(singleFoodMeals);
      expect(getSavedMeals(saver)?.length).toBe(200);
      expect(suggestions.addSuggestion).toHaveBeenCalledWith(mealB);
    });

    it("should notify listener if there is a listener registered when adds a meal", () => {
      const loader = createMockLoader([mealA]);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday(), suggestions);
      const mockListener = createMockListener();
      savedMeals.register(mockListener);

      const result = savedMeals.add(mealB);
      expect(result[0]).toBe(mealB);
      expect(result[1]).toBe(mealA);
      expect(mockListener.added).toHaveBeenCalled();
    });
  });

  describe("remove a meal", () => {
    beforeEach(() => {
      (suggestions.removeSuggestion as jest.Mock).mockClear();
    });

    it("removes a meal and saves the new list", () => {
      const loader = createMockLoader([mealA, mealB]);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday(), suggestions);
      const mockListener = createMockListener();
      savedMeals.register(mockListener);

      const result = savedMeals.remove(mealA);
      expect(result).toEqual([mealB]);
      expect(getSavedMeals(saver)).toEqual([mealB]);
      expect(suggestions.removeSuggestion).toHaveBeenCalledWith(mealA);
      expect(mockListener.deleted).toHaveBeenCalled();
    });

    it("does not change list if meal is not found", () => {
      const loader = createMockLoader([mealA]);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday(), suggestions);
      const mockListener = createMockListener();
      savedMeals.register(mockListener);

      const result = savedMeals.remove(mealB);
      expect(result).toEqual([mealA]);
      expect(getSavedMeals(saver)).toEqual([mealA]);
      expect(suggestions.removeSuggestion).toHaveBeenCalledWith(mealB);
      expect(mockListener.deleted).not.toHaveBeenCalled();
    });
  });

  describe("select a meal", () => {
    it("moves the selected meal to the front, saves the new list, calls today.addSavedMeal, and calls callback with updatedToday", () => {
      const loader = createMockLoader([mealA, mealB]);
      const saver = createMockSaver();
      const today = createMockToday();
      const updatedToday = { some: 'updated' };
      today.addSavedMeal.mockReturnValue(updatedToday);
      const callback = jest.fn();
      const savedMeals = new SavedMeals(loader, saver, today, suggestions);
      const result = savedMeals.select(mealB, callback);
      expect(result[0]).toBe(mealB);
      expect(result[1]).toBe(mealA);
      expect(getSavedMeals(saver)).toEqual([mealB, mealA]);
      expect(today.addSavedMeal).toHaveBeenCalledWith(mealB.foods);
      expect(callback).toHaveBeenCalledWith(updatedToday);
    });

    it("does not change order if meal is already first, calls today.addSavedMeal, and calls callback with updatedToday", () => {
      const loader = createMockLoader([mealB, mealA]);
      const saver = createMockSaver();
      const today = createMockToday();
      const updatedToday = { some: 'updated' };
      today.addSavedMeal.mockReturnValue(updatedToday);
      const callback = jest.fn();
      const savedMeals = new SavedMeals(loader, saver, today, suggestions);
      const result = savedMeals.select(mealB, callback);
      expect(result[0]).toBe(mealB);
      expect(result[1]).toBe(mealA);
      expect(getSavedMeals(saver)).toEqual([mealB, mealA]);
      expect(today.addSavedMeal).toHaveBeenCalledWith(mealB.foods);
      expect(callback).toHaveBeenCalledWith(updatedToday);
    });

    it("does not change order if meal is not found and does not call today.addSavedMeal or callback", () => {
      const loader = createMockLoader([mealA]);
      const saver = createMockSaver();
      const today = createMockToday();
      const callback = jest.fn();
      const savedMeals = new SavedMeals(loader, saver, today, suggestions);
      const result = savedMeals.select(mealB, callback);
      expect(result).toEqual([mealA]);
      expect(getSavedMeals(saver)).toEqual([mealA]);
      expect(today.addSavedMeal).not.toHaveBeenCalled();
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("search by description", () => {
    const meals = [
      { foods: [{ description: "Grilled Chicken Breast", serving: {} }] },
      { foods: [{ description: "Beef Burger", serving: {} }] },
      { foods: [{ description: "Salmon Sushi Roll", serving: {} }] },
      { foods: [{ description: "Chicken Caesar Salad", serving: {} }] },
    ];

    it("finds meals containing all search words in any food description", () => {
      const loader = createMockLoader(meals);
      const savedMeals = new SavedMeals(loader, createMockSaver(), createMockToday(), suggestions);
      expect(savedMeals.searchByDescription("chicken")).toHaveLength(2);
      expect(savedMeals.searchByDescription("burger")).toHaveLength(1);
      expect(savedMeals.searchByDescription("sushi roll")).toHaveLength(1);
    });

    it("is case-insensitive and ignores word order", () => {
      const loader = createMockLoader(meals);
      const savedMeals = new SavedMeals(loader, createMockSaver(), createMockToday(), suggestions);
      expect(savedMeals.searchByDescription("CHICKEN")).toHaveLength(2);
      expect(savedMeals.searchByDescription("salad caesar")).toHaveLength(1);
    });

    it("returns empty array if no meal matches all words", () => {
      const loader = createMockLoader(meals);
      const savedMeals = new SavedMeals(loader, createMockSaver(), createMockToday(), suggestions);
      expect(savedMeals.searchByDescription("tofu")).toHaveLength(0);
    });

    it("returns all meals if search term is empty", () => {
      const loader = createMockLoader(meals);
      const savedMeals = new SavedMeals(loader, createMockSaver(), createMockToday(), suggestions);
      expect(savedMeals.searchByDescription("")).toEqual(meals);
    });
  });
});