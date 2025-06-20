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

    it("should return a new object reference each time", () => {
      const day1 = mutation.newDay();
      const day2 = mutation.newDay();
      expect(day1).not.toBe(day2);
    });

    it("should use the provided current DayPage's target if given", () => {
      const customTarget = { ...getDefaultTarget(), unlimitedFruit: true, calorie: 1234 };
      const current = {
        date: "old-date",
        target: customTarget,
        meals: [newMeal()],
      };
      const day = mutation.newDay(current);
      expect(day.target).toEqual(customTarget);
    });

    it("should reset meals to a single empty meal even if current has multiple meals", () => {
      const meal1 = newMeal();
      meal1.foods.push({ description: "A", serving: {} });
      const meal2 = newMeal();
      meal2.foods.push({ description: "B", serving: {} });
      const current = {
        date: "old-date",
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [meal1, meal2],
      };
      const day = mutation.newDay(current);
      expect(day.meals.length).toBe(1);
      expect(day.meals[0].foods).toEqual([]);
    });

    it("should set the date to today even if current has a different date", () => {
      const current = {
        date: "not-today",
        target: { ...getDefaultTarget(), unlimitedFruit: false },
        meals: [newMeal()],
      };
      const day = mutation.newDay(current);
      const today = new Date().toLocaleDateString();
      expect(day.date).toBe(today);
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

  describe("addFood", () => {
    it("should add food to the specified meal's foods array", () => {
      const initialDay = mutation.newDay();
      const mealToAddFood = initialDay.meals[0];
      const foodToAdd: Food = {description: "Apple", serving: {}};
      const updatedDay = mutation.addFood(initialDay, mealToAddFood, foodToAdd);
      expect(updatedDay.meals[0].foods.length).toBe(1);
      expect(updatedDay.meals[0].foods[0]).toEqual(foodToAdd);
    });

    it("should not modify other meals when adding food to a specific meal", () => {
      const initialDay = mutation.newDay();
      const mealToAddFood = initialDay.meals[0];
      const foodToAdd: Food = {description: "Apple", serving: {}};
      const updatedDay = mutation.addFood(initialDay, mealToAddFood, foodToAdd);
      expect(updatedDay.meals.length).toBe(1);
    });
  });

  describe("updateFood", () => {
    it("should update food in the specified meal's foods array", () => {
      const initialDay = mutation.newDay();
      const mealToAdd = initialDay.meals[0];
      const foodToAdd: Food = {description: "Apple", serving: {}};
      const updatedDay = mutation.addFood(initialDay, mealToAdd, foodToAdd);

      const mealToUpdateFood = updatedDay.meals[0];
      const foodToUpdate = mealToUpdateFood.foods[0];
      const replacedFood: Food = {description: "Banana", serving: {}};
      const finalUpdatedDay = mutation.updateFood(updatedDay, mealToUpdateFood, foodToUpdate, replacedFood);
      expect(finalUpdatedDay.meals[0].foods[0]).toEqual(replacedFood);
    });
  });

  describe("deleteFood", () => {
    it("should remove food from the specified meal's foods array", () => {
      const initialDay = mutation.newDay();
      const mealToAddFood = initialDay.meals[0];
      const foodToAdd: Food = {description: "Apple", serving: {}};
      const updatedDay = mutation.addFood(initialDay, mealToAddFood, foodToAdd);

      const mealToDeleteFood = updatedDay.meals[0];
      const foodToDelete = mealToDeleteFood.foods[0];
      const finalUpdatedDay = mutation.deleteFood(updatedDay, mealToDeleteFood, foodToDelete);
      expect(finalUpdatedDay.meals[0].foods.length).toBe(0);
    });
  });

  describe("updateTarget", () => {
    it("should update the target values in the day", () => {
      const initialDay = mutation.newDay();
      const newTarget = { ...initialDay.target };
      newTarget.calorie = 2000;
      const updatedDay = mutation.updateTarget(initialDay, newTarget);
      expect(updatedDay.target).toEqual(newTarget);
    });
  });

  describe("toggleUnlimitedFruit", () => {
    it("should toggle the unlimitedFruit value in the target", () => {
      const initialDay = mutation.newDay();
      const updatedDay = mutation.toggleUnlimitedFruit(initialDay);
      expect(updatedDay.target.unlimitedFruit).toBe(!initialDay.target.unlimitedFruit);
    });
  });

});
