import { validation, Today, TodayLoader, TodaySaver, ReadOnlyToday, Diary } from "./diary";
import { Food, newMeal } from "./Food";
import { getDefaultTarget } from "./Target";
import { DiaryHistory } from "./diaryHistory";
import { UserPreferences } from "./userPreferences";
import { today } from "../features/day-page/api";
import { CustomTargets } from "./customTarget";

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
  let mockDiaryHistory: DiaryHistory;

  beforeEach(() => {
    mockDiaryHistory = Object.create(DiaryHistory.prototype);
    mockDiaryHistory.add = jest.fn();
  });

  describe("addMeal", () => {
    it("should add a new meal to today's meals", () => {
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: new Date().toLocaleDateString(),
          target: getDefaultTarget(),
          meals: [newMeal()],
        })
      };
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const updatedDay = today.addMeal();
      expect(updatedDay.meals.length).toBe(2);
    });
  });

  describe("addSavedMeal", () => {
    it("should add a saved meal to today's meals", () => {
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: new Date().toLocaleDateString(),
          target: getDefaultTarget(),
          meals: [newMeal()],
        })
      };
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
      }
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: new Date().toLocaleDateString(),
          target: getDefaultTarget(),
          meals: [lunch, emptyMeal],
        })
      };
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const savedFoods: Food[] = [{ description: "Apple", serving: {} }];
      const updatedDay = today.addSavedMeal(savedFoods);
      expect(updatedDay.meals.length).toBe(2);
      expect(updatedDay.meals[1].foods).toEqual(savedFoods);
    });
  });

  describe("deleteMeal", () => {
    it("should delete a meal from today's meals", () => {
      const mealToDelete = {
        mealTime: "lunch",
        foods: [
          { description: "Banana", serving: {} },
        ],
      };
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: new Date().toLocaleDateString(),
          target: getDefaultTarget(),
          meals: [newMeal(), mealToDelete],
        })
      };
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      const updatedDay = today.deleteMeal(mealToDelete);
      expect(updatedDay.meals.length).toBe(1);
    });
  });

  describe("addFood", () => {
    it("should add food to a specific meal in today's meals", () => {
      const meal = newMeal();
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: new Date().toLocaleDateString(),
          target: getDefaultTarget(),
          meals: [meal],
        })
      };
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
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: new Date().toLocaleDateString(),
          target: getDefaultTarget(),
          meals: [meal],
        })
      };
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
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: new Date().toLocaleDateString(),
          target: getDefaultTarget(),
          meals: [meal],
        })
      };
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
      const mockLoader: TodayLoader =
        { load: jest.fn().mockReturnValue(currentDay) };
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
      const mockLoader: TodayLoader =
        { load: jest.fn().mockReturnValue(currentDay) };
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
      const mockLoader: TodayLoader =
        { load: jest.fn().mockReturnValue(currentDay) };
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
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: "6/1/2025",
          target: { unlimitedFruit: false, ...getDefaultTarget() },
          meals: [],
        })
      };
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      expect(today.toggleUnlimitedFruit().target.unlimitedFruit).toBeTruthy();
    });

    it("should toggle to false if value is true", () => {
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: "6/1/2025",
          target: { unlimitedFruit: true, ...getDefaultTarget() },
          meals: [],
        })
      };
      const mockSaver: TodaySaver = { save: jest.fn() };
      const today = new Today(mockLoader, mockSaver);
      expect(today.toggleUnlimitedFruit().target.unlimitedFruit).toBeFalsy();
    });
  });
});

describe("ReadOnlyToday", () => {
  describe("currentDay", () => {
    it("should return current day from loader", () => {
      const mockLoader: TodayLoader =
      {
        load: jest.fn().mockReturnValue({
          date: "6/1/2025",
          target: getDefaultTarget(),
          meals: []
        })
      };
      const today = new ReadOnlyToday(mockLoader);
      const currentDay = today.currentDay();
      expect(currentDay.date).toBe("6/1/2025");
      expect(currentDay.target).toEqual(getDefaultTarget());
      expect(currentDay.meals).toEqual([]);
    });
  });
});

describe("Diary class", () => {
  let mockDiaryHistory: DiaryHistory;
  let mockToday: Today;

  beforeEach(() => {
    mockDiaryHistory = Object.create(DiaryHistory.prototype);
    mockDiaryHistory.add = jest.fn();
    mockToday = Object.create(Today.prototype);
    mockToday.newDay = jest.fn();
  });

  describe("newDay", () => {
    let mockUserPreferences: UserPreferences;
    let diary: Diary;

    beforeEach(() => {
      mockUserPreferences = Object.create(UserPreferences.prototype);
      mockUserPreferences.getStartDayTarget = jest.fn().mockReturnValue(undefined);
      diary = new Diary(mockToday, mockDiaryHistory, mockUserPreferences);
    });

    it("should create a new DayPage with today's date", () => {
      const previousDay = {
        date: "6/1/2025",
        target: getDefaultTarget(),
        meals: [],
      };
      const todayDate = new Date().toLocaleDateString();
      const currentDay = {
        date: todayDate,
        target: getDefaultTarget(),
        meals: [],
      };
      mockToday.newDay = jest.fn().mockReturnValue({ current: currentDay, previous: previousDay });

      const day = diary.newDay();
      expect(day.date).toBe(todayDate);
      expect(mockDiaryHistory.add).toHaveBeenCalledWith(previousDay);
    });

    it("should use the provided current day if it is today", () => {
      const customTarget = { ...getDefaultTarget(), unlimitedFruit: true, calorie: 1234 };
      const current = {
        date: new Date().toLocaleDateString(),
        target: customTarget,
        meals: [newMeal()],
      };
      mockToday.newDay = jest.fn().mockReturnValue({ current, previous: undefined });

      const day = diary.newDay();
      expect(day).toEqual(current);
      expect(mockDiaryHistory.add).not.toHaveBeenCalled();
    });

    it("should create a new DayPage with user's start day target", () => {
      const previousDay = {
        date: "6/1/2025",
        target: getDefaultTarget(),
        meals: [],
      };
      const startDayTarget = { ...getDefaultTarget(), unlimitedFruit: true, calorie: 1500 };
      const currentDay = {
        date: new Date().toLocaleDateString(),
        target: startDayTarget,
        meals: [],
      };
      mockToday.newDay = jest.fn().mockReturnValue({ current: currentDay, previous: previousDay });
      mockUserPreferences.getStartDayTarget = jest.fn().mockReturnValue(startDayTarget);
      
      const day = diary.newDay();
      expect(day.target).toEqual(startDayTarget);
      expect(mockDiaryHistory.add).toHaveBeenCalledWith(previousDay);
    });
  });

});