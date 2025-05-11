import { Food } from "./Food";

export interface SavedMeal {
  foods: Food[];
}

export type BaseFood = Pick<Food, "description">;
export interface BaseSavedMeal {
  foods: BaseFood[];
}
