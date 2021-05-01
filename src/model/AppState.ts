import { Meal } from "./Food";

export interface AppState {
  mealStates: MealState[];
}

export interface MealState {
  meal: Meal;
  editState?: string;
}