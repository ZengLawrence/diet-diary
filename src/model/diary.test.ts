import { validation, mutation } from "./diary";
import { Food, Meal, newMeal } from "./Food";
import { getDefaultTarget } from "./Target";

describe("validation", () => {
  describe("isToday", () => {
    it("should return true for today's date", () => {
      const today = new Date().toLocaleDateString();
      expect(validation.isToday(today)).toBe(true);
    });

    it("should return false for a different date", () => {
      // Pick a date that is not today (e.g., yesterday)
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
      expect(validation.isToday(yesterday)).toBe(false);
    });
  });
});

describe("mutation", () => {
  describe("newDay", () => {
    it("should create a new DayPage with today's date", () => {
      const day = mutation.newDay();
      const today = new Date().toLocaleDateString();
      expect(day.date).toBe(today);
    });

    it("should set unlimitedFruit to false by default", () => {
      const day = mutation.newDay();
      expect(day.target.unlimitedFruit).toBe(false);
    });

    it("should set target to default target values", () => {
      const day = mutation.newDay();
      const defaultTarget = getDefaultTarget();
      // Check all properties from defaultTarget are present in day.target
      expect(day.target).toEqual(
        expect.objectContaining(defaultTarget)
      );
    });

    it("should initialize meals as an array of one meal with empty foods array", () => {
      const day = mutation.newDay();
      expect(Array.isArray(day.meals)).toBe(true);
      expect(day.meals.length).toBe(1);
      expect(day.meals[0]).toEqual(
        expect.objectContaining({
          foods: [],
        })
      );
    });
  });

  describe("addMeal", () => {
    it("should add a new meal to the meals array", () => {
      const initialDay = mutation.newDay();
      const updatedDay = mutation.addMeal(initialDay);
      expect(updatedDay.meals.length).toBe(2);
      expect(updatedDay.meals[1]).toEqual(
        expect.objectContaining({
          foods: [],
        })
      );
    });
  });

  describe("addSavedMeal", () => {
    it("should add a new meal with saved foods to the meals array and remove first empty meal", () => {
      const initialDay = mutation.newDay();
      const savedFoods: Food[] = [{description: "Apple", serving: {}}];
      const updatedDay = mutation.addSavedMeal(initialDay, savedFoods);
      expect(updatedDay.meals.length).toBe(1);
      expect(updatedDay.meals[0].foods).toEqual(savedFoods);
    });

    it("should add two meals if the first one is not empty", () => {  
      const initialDay = mutation.newDay();
      const savedFoods: Food[] = [{description: "Apple", serving: {}}];
      const updatedDay = mutation.addSavedMeal(initialDay, savedFoods);
      const secondSavedFoods: Food[] = [{description: "Banana", serving: {}}];
      const updatedDay2 = mutation.addSavedMeal(updatedDay, secondSavedFoods);
      expect(updatedDay2.meals.length).toBe(2);
      expect(updatedDay2.meals[1].foods).toEqual(secondSavedFoods);
    });
  });

  describe("deleteMeal", () => {
    it("should remove the specified meal from the meals array", () => {
      const initialDay = mutation.newDay();
      const mealToDelete = initialDay.meals[0];
      const updatedDay = mutation.deleteMeal(initialDay, mealToDelete);
      expect(updatedDay.meals.length).toBe(0);
    });

    it("should not remove any meals if the specified meal is not found", () => {
      const initialDay = mutation.newDay();
      const nonExistentMeal: Meal = newMeal();
      const updatedDay = mutation.deleteMeal(initialDay, nonExistentMeal);
      expect(updatedDay.meals.length).toBe(1);
    });
  });

});
