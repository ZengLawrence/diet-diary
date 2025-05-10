import { search } from "./savedMeals";

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
