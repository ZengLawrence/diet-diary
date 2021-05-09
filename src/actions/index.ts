import { Food } from "../model/Food";

export interface Action {
  type: string;
}

export interface MealAction extends Action {
  type: string;
  mealIndex: number;
}

export function newDayAction(): Action {
  return { type: 'new-day' };
}

export function newMealAction(): Action {
  return { type: 'new-meal' };
}

export function deleteMealAction(mealIndex: number): MealAction {
  return {
    type: 'delete-meal',
    mealIndex,
  };
}

export function enterMealEditModelAction(mealIndex: number): MealAction {
  return {
    type: 'enter-meal-edit-mode',
    mealIndex,
  };
}

export function enterMealAddModeAction(mealIndex: number): MealAction {
  return {
    type: 'enter-meal-add-mode',
    mealIndex,
  };
}

export function exitMealEditModeAction(mealIndex: number): MealAction {
  return {
    type: 'exit-meal-edit-mode',
    mealIndex,
  };
}

export function enterEditModeAction(): Action {
  return { type: 'enter-edit-mode' };
}

export function exitEditModeAction(): Action {
  return { type: 'exit-edit-mode' };
}

export interface FoodAction extends Action {
  mealIndex: number;
}

export interface AddFoodAction extends FoodAction {
  type: "add-food";
  food: Food;
}

export function addFoodAction(mealIndex: number, food: Food): AddFoodAction {
  return {
    type: "add-food",
    mealIndex,
    food,
  }
}

export interface CancelAddFoodAction extends FoodAction {
  type: "cancel-add-food";
}

export function cancelAddFoodAction(mealIndex: number): CancelAddFoodAction {
  return {
    type: "cancel-add-food",
    mealIndex,
  }
}

export interface UpdateFoodAction extends FoodAction {
  type: "update-food";
  foodIndex: number;
  food: Food;
}

export function updateFoodAction(mealIndex: number, foodIndex: number, food: Food): UpdateFoodAction {
  return {
    type: "update-food",
    mealIndex,
    foodIndex,
    food,
  }
}

export interface EnterFoodEditModeAction extends FoodAction {
  type: "enter-food-edit-mode";
  foodIndex: number;
}

export function enterFoodEditModeAction(mealIndex: number, foodIndex: number): EnterFoodEditModeAction {
  return {
    type: "enter-food-edit-mode",
    mealIndex,
    foodIndex,
  }
}

export function exitFoodEditModeAction(mealIndex: number): FoodAction {
  return {
    type: "exit-food-edit-mode",
    mealIndex,
  }
}
