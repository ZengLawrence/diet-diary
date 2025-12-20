import { describe, expect, it, jest } from "@jest/globals";
import { mock } from "jest-mock-extended";
import type { Food} from "./Food";
import { newMeal } from "./Food";
import { getDefaultTarget } from "./Target";
import type { TodayLoader, TodaySaver} from "./today";
import { ReadOnlyToday, Today, validation } from "./today";

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

describe("Today class", () => {

  describe("addMeal", () => {
    it("should add a new meal to today's meals", () => {
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue({
        date: new Date().toLocaleDateString(),
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [newMeal()],
      });
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const updatedDay = today.addMeal();
      expect(updatedDay.meals.length).toBe(2);
    });
  });

  describe("addSavedMeal", () => {
    const mockLoader = mock<TodayLoader>();

    it("should add a saved meal to today's meals", () => {
      mockLoader.load.mockReturnValue({
        date: new Date().toLocaleDateString(),
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [newMeal()],
      });
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const savedFoods: Food[] = [{ description: "Apple", serving: {} }];
      const updatedDay = today.addSavedMeal(savedFoods);
      expect(updatedDay.meals.length).toBe(1);
      expect(updatedDay.meals[0].foods).toEqual(savedFoods);
    });

    it("should replace last empty meal with saved meal", () => {
      const lunch = {
        mealTime: "lunch",
        foods: [
          { description: "Banana", serving: {} },
        ],
      };
      const emptyMeal = {
        mealTime: "empty",
        foods: [],
      };
      mockLoader.load.mockReturnValue({
        date: new Date().toLocaleDateString(),
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [lunch, emptyMeal],
      });
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const savedFoods: Food[] = [{ description: "Apple", serving: {} }];
      const updatedDay = today.addSavedMeal(savedFoods);
      expect(updatedDay.meals.length).toBe(2);
      expect(updatedDay.meals[1].foods).toEqual(savedFoods);
    });
  });

  describe("deleteMeal", () => {
    const mockLoader = mock<TodayLoader>();

    it("should delete a meal from today's meals", () => {
      const mealToDelete = {
        mealTime: "lunch",
        foods: [
          { description: "Banana", serving: {} },
        ],
      };
      mockLoader.load.mockReturnValue({
          date: new Date().toLocaleDateString(),
          target: { ...getDefaultTarget(), unlimitedFruit: false },
          meals: [newMeal(), mealToDelete],
        });
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const updatedDay = today.deleteMeal(mealToDelete);
      expect(updatedDay.meals.length).toBe(1);
    });
  });

  describe("addFood", () => {
    it("should add food to a specific meal in today's meals", () => {
      const meal = newMeal();
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue({
        date: new Date().toLocaleDateString(),
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [meal],
      });
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const foodToAdd: Food = { description: "Apple", serving: {} };
      const updatedDay = today.addFood(meal, foodToAdd);
      expect(updatedDay.meals[0].foods.length).toBe(1);
      expect(updatedDay.meals[0].foods[0]).toEqual(foodToAdd);
    });
  });

  describe("updateFood", () => {
    it("should update food in a specific meal in today's meals", () => {
      const meal = newMeal();
      const food: Food = { description: "Apple", serving: {} };
      meal.foods.push(food);
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue({
          date: new Date().toLocaleDateString(),
          target: { ...getDefaultTarget(), unlimitedFruit: false },
          meals: [meal],
        });

      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const foodToUpdate = food;
      const replacedFood: Food = { description: "Banana", serving: {} };
      const finalUpdatedDay = today.updateFood(meal, foodToUpdate, replacedFood);
      expect(finalUpdatedDay.meals[0].foods[0]).toEqual(replacedFood);
    });
  });

  describe("deleteFood", () => {
    it("should delete food from a specific meal in today's meals", () => {
      const meal = newMeal();
      const food: Food = { description: "Apple", serving: {} };
      meal.foods.push(food);
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue({
        date: new Date().toLocaleDateString(),
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [meal],
        });
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const finalUpdatedDay = today.deleteFood(meal, food);
      expect(finalUpdatedDay.meals[0].foods.length).toBe(0);
    });
  });

  describe("updateTarget", () => {
    it("should update the target values in today's day", () => {
      const currentDay = {
        date: new Date().toLocaleDateString(),
        target: { unlimitedFruit: false, ...getDefaultTarget(2000) },
        meals: [newMeal()],
      }
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue(currentDay);
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const newTarget = { ...currentDay.target, calorie: 2500 };
      const updatedDay = today.updateTarget(newTarget);
      expect(updatedDay.target.calorie).toBe(2500);
    });
  });

  describe("updateTargetIfSameCalorie", () => {
    it("should update the target if the calorie matches", () => {
      const currentDay = {
        date: new Date().toLocaleDateString(),
        target: { unlimitedFruit: false, ...getDefaultTarget(2000) },
        meals: [newMeal()],
      }
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue(currentDay);
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const newTarget = { ...currentDay.target, calorie: 2000 };
      const updatedDay = today.updateTargetIfSameCalorie(newTarget);
      expect(updatedDay.target.calorie).toBe(2000);
      expect(mockSaver.save).toHaveBeenCalledWith(updatedDay);
    });

    it("should not update the target if the calorie does not match", () => {
      const currentDay = {
        date: new Date().toLocaleDateString(),
        target: { unlimitedFruit: false, ...getDefaultTarget(2000) },
        meals: [newMeal()],
      }
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue(currentDay);
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const newTarget = { ...currentDay.target, calorie: 2500 };
      const updatedDay = today.updateTargetIfSameCalorie(newTarget);
      expect(updatedDay.target.calorie).toBe(2000);
      expect(mockSaver.save).not.toHaveBeenCalled();
    });
  });

  describe("toggleUnlimitedFruit", () => {
    it("should toggle to true if value is false", () => {
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue({
        date: "6/1/2025",
        target: { unlimitedFruit: false, ...getDefaultTarget() },
        meals: [],
      });
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      expect(today.toggleUnlimitedFruit().target.unlimitedFruit).toBeTruthy();
    });

    it("should toggle to false if value is true", () => {
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue({
        date: "6/1/2025",
        target: { unlimitedFruit: true, ...getDefaultTarget() },
        meals: [],
      });
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      expect(today.toggleUnlimitedFruit().target.unlimitedFruit).toBeFalsy();
    });
  });

  describe("TodayListener", () => {
    it("should call updated with the current day", () => {
      const current = {
        date: "6/1/2025",
        target: { unlimitedFruit: false, ...getDefaultTarget() },
        meals: [],
      };
      const mockLoader = mock<TodayLoader>();
      mockLoader.load.mockReturnValue(current);
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const listener = jest.fn();
      today.registerListener({ updated: listener });

      const newTarget = { ...current.target };
      newTarget.serving.sweet = 0;
      today.updateTargetIfSameCalorie(newTarget);
      const updatedDay = {
        ...current,
        target: newTarget,
      };
      expect(listener).toHaveBeenCalledWith(updatedDay);
    });
  });
});

describe("ReadOnlyToday", () => {
  describe("currentDay", () => {
    it("should return current day from loader", () => {
      const mockLoader = mock<TodayLoader>();
      const currentDayFromLoader = {
        date: "6/1/2025",
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: []
      };
      mockLoader.load.mockReturnValue(currentDayFromLoader);
      const today = new ReadOnlyToday(mockLoader);
      expect(today.currentDay()).toMatchObject(currentDayFromLoader);
    });
  });
});
