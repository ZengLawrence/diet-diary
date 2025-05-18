import { validation, mutation } from "./diary";
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
});
