import { Food } from "./model/Food";

export interface Action {
  type: string;
}

export interface AddFoodAction extends Action {
  type: "add-food";
  food: Food;
  mealIndex: number
}
