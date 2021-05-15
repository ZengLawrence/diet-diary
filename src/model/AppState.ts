import { Meal } from "./Food";
import { Goal } from "./Goal";

export interface AppState {
  date: string;
  mealStates: MealState[];
  editMode: boolean;
  goal: Goal;
}

export interface MealState {
  meal: Meal;
  editState?: "add" | "edit" | undefined;
  foodEditIndex?: number;
}