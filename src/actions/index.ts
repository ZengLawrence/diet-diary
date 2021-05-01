import { Food } from "../model/Food";

export interface Action {
  type: string;
}

export interface FoodAction extends Action {
  mealIndex: number;
}

export interface AddFoodAction extends FoodAction {
  type: "add-food";
  food: Food;
}

export interface CancelAddFoodAction extends FoodAction {
  type: "cancel-add-food";
}
