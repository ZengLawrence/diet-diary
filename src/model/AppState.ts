import { Meal } from "./Food";

export interface AppState {
  date: string;
  mealStates: MealState[];
}

export interface MealState {
  meal: Meal;
  editState?: "add" | undefined;
}