import { search, mutation } from "./savedMeals";

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
      const result = mutation.selected([mealA, mealB, mealC], mealB);
      expect(result[0]).toBe(mealB);
      expect(result[1]).toBe(mealA);
      expect(result[2]).toBe(mealC);
    });

    it("does not change order if meal is already first", () => {
      const result = mutation.selected([mealB, mealA, mealC], mealB);
      expect(result[0]).toBe(mealB);
      expect(result[1]).toBe(mealA);
      expect(result[2]).toBe(mealC);
    });

    it("does not change order if meal is not found", () => {
      const result = mutation.selected([mealA, mealC], mealB);
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
