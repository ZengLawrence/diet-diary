import { Food } from "../model/Food";

export interface Action {
  type: string;
}

export function newMealAction(): Action {
  return { type: 'new-meal' };
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
