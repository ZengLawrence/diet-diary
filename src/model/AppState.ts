import { Meal } from "./Food";
import { Target } from "./Target";

export interface AppState {
  date: string;
  mealStates: MealState[];
  editMode: boolean;
  target: Target;
  editTarget: boolean;
}

export interface MealState {
  meal: Meal;
  editState?: "add" | "edit" | undefined;
  foodEditIndex?: number;
}