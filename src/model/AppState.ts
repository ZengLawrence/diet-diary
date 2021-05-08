import { Meal } from "./Food";

export interface AppState {
  date: string;
  mealStates: MealState[];
  editMode: boolean;
}

export interface MealState {
  meal: Meal;
  editState?: "add" | "edit" | undefined;
}