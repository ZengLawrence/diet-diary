import { Food } from "./Food";
import { SavedMeal } from "./SavedMeal";
import { search, mutation, SavedMeals, SavedMealsLoader, SavedMealsSaver } from "./savedMeals";
import { Today } from "./diary";

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
          { description: "Grilled Chicken Breast" },
          { description: "Steamed Broccoli" },
          { description: "Brown Rice" },
        ],
      },
      {
        foods: [
          { description: "Beef Burger" },
          { description: "French Fries" },
        ],
      },
      {
        foods: [
          { description: "Salmon Sushi Roll" },
          { description: "Miso Soup" },
        ],
      },
      {
        foods: [
          { description: "Chicken Caesar Salad" },
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

describe("mutation", () => {
  describe("save", () => {
    const mealA = { foods: [{ description: "A" }] };
    const mealB = { foods: [{ description: "B" }] };
    const mealC = { foods: [{ description: "C" }] };
    const maxSavedCount = 200;

    it("adds a meal to the beginning of the array", () => {
      const result = mutation.save([mealA, mealB], mealC);
      expect(result[0]).toBe(mealC);
      expect(result[1]).toBe(mealA);
      expect(result[2]).toBe(mealB);
    });

    it("does not exceed max limit", () => {
      const manyMeals = Array(maxSavedCount).fill(mealA);
      const result = mutation.save(manyMeals, mealB);
      expect(result.length).toBe(maxSavedCount);
      expect(result[0]).toBe(mealB);
    });

    it("returns all meals if under max limit", () => {
      const fewMeals = [mealA, mealB];
      const result = mutation.save(fewMeals, mealC);
      expect(result.length).toBe(3);
      expect(result).toEqual([mealC, mealA, mealB]);
    });
  });

  describe("selected", () => {
    const mealA = { foods: [{ description: "A" }] };
    const mealB = { foods: [{ description: "B" }] };
    const mealC = { foods: [{ description: "C" }] };

    it("moves the selected meal to the beginning of the array", () => {
      const { meals: result, found } = mutation.selected([mealA, mealB, mealC], mealB);
      expect(found).toBe(true);
      expect(result[0]).toBe(mealB);
      expect(result[1]).toBe(mealA);
      expect(result[2]).toBe(mealC);
    });

    it("does not change order if meal is already first", () => {
      const { meals: result, found } = mutation.selected([mealB, mealA, mealC], mealB);
      expect(found).toBe(true);
      expect(result[0]).toBe(mealB);
      expect(result[1]).toBe(mealA);
      expect(result[2]).toBe(mealC);
    });

    it("does not change order if meal is not found", () => {
      const { meals: result, found } = mutation.selected([mealA, mealC], mealB);
      expect(found).toBe(false);
      expect(result).toEqual([mealA, mealC]);
    });
  });

  describe("remove", () => {
    const mealA = { foods: [{ description: "A" }] };
    const mealB = { foods: [{ description: "B" }] };
    const mealC = { foods: [{ description: "C" }] };

    it("removes the specified meal from the array", () => {
      const result = mutation.remove([mealA, mealB, mealC], mealB);
      expect(result).toEqual([mealA, mealC]);
    });

    it("does not change order if meal is not found", () => {
      const result = mutation.remove([mealA, mealC], mealB);
      expect(result).toEqual([mealA, mealC]);
    });
  });
  
});

// Jest mocks for dependent interfaces
const createMockLoader = (meals: SavedMeal[]): SavedMealsLoader => ({
  load: jest.fn(() => meals),
});

const createMockSaver = (): SavedMealsSaver => {
  return {
    savedMeals: [] as SavedMeal[],
    save: jest.fn(function (this: {savedMeals: SavedMeal[]}, meals: SavedMeal[]) {
      this.savedMeals = meals;
    }),
  } as any;
};

// Helper to get the last saved meals from the mock
const getSavedMeals = (saver: any) => saver.save.mock.calls.length > 0 ? saver.save.mock.calls[saver.save.mock.calls.length - 1][0] : undefined;

describe("SavedMeals class", () => {
  const mealA: SavedMeal = { foods: [{ ...minimalFood, description: "A" }] };
  const mealB: SavedMeal = { foods: [{ ...minimalFood, description: "B" }] };

  describe("add a meal", () => {
    it("adds a meal and saves the new list", () => {
      const loader = createMockLoader([mealA]);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday());
      const result = savedMeals.add(mealB);
      expect(result[0]).toBe(mealB);
      expect(result[1]).toBe(mealA);
      expect(getSavedMeals(saver)).toEqual([mealB, mealA]);
    });

    it("does not exceed max saved count", () => {
      const manyMeals = Array(200).fill(mealA) as SavedMeal[];
      const loader = createMockLoader(manyMeals);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday());
      const result = savedMeals.add(mealB);
      expect(result.length).toBe(200);
      expect(result[0]).toBe(mealB);
      expect(getSavedMeals(saver).length).toBe(200);
    });
  });

  describe("remove a meal", () => {
    it("removes a meal and saves the new list", () => {
      const loader = createMockLoader([mealA, mealB]);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday());
      const result = savedMeals.remove(mealA);
      expect(result).toEqual([mealB]);
      expect(getSavedMeals(saver)).toEqual([mealB]);
    });

    it("does not change list if meal is not found", () => {
      const loader = createMockLoader([mealA]);
      const saver = createMockSaver();
      const savedMeals = new SavedMeals(loader, saver, createMockToday());
      const result = savedMeals.remove(mealB);
      expect(result).toEqual([mealA]);
      expect(getSavedMeals(saver)).toEqual([mealA]);
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
      const savedMeals = new SavedMeals(loader, saver, today);
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
      const savedMeals = new SavedMeals(loader, saver, today);
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
      const savedMeals = new SavedMeals(loader, saver, today);
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
      const savedMeals = new SavedMeals(loader, createMockSaver(), createMockToday());
      expect(savedMeals.searchByDescription("chicken")).toHaveLength(2);
      expect(savedMeals.searchByDescription("burger")).toHaveLength(1);
      expect(savedMeals.searchByDescription("sushi roll")).toHaveLength(1);
    });

    it("is case-insensitive and ignores word order", () => {
      const loader = createMockLoader(meals);
      const savedMeals = new SavedMeals(loader, createMockSaver(), createMockToday());
      expect(savedMeals.searchByDescription("CHICKEN")).toHaveLength(2);
      expect(savedMeals.searchByDescription("salad caesar")).toHaveLength(1);
    });

    it("returns empty array if no meal matches all words", () => {
      const loader = createMockLoader(meals);
      const savedMeals = new SavedMeals(loader, createMockSaver(), createMockToday());
      expect(savedMeals.searchByDescription("tofu")).toHaveLength(0);
    });

    it("returns all meals if search term is empty", () => {
      const loader = createMockLoader(meals);
      const savedMeals = new SavedMeals(loader, createMockSaver(), createMockToday());
      expect(savedMeals.searchByDescription("")).toEqual(meals);
    });
  });
});
