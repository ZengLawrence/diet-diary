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

export function enterMealAddModelAction(mealIndex: number): MealAction {
  return {
    type: 'enter-meal-add-mode',
    mealIndex,
  };
}

export function exitMealEditModelAction(mealIndex: number): MealAction {
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
