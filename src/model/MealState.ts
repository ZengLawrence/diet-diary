import { Meal, newMeal } from "./Food";

export type MealEditState = "add" | "edit" | undefined;

export interface MealState {
  meal: Meal;
  editState?: MealEditState;
  foodEditIndex?: number;
}

export function newMealState(): MealState {
  return {
    meal: newMeal(),
    editState: "add",
  };
}

export function today() {
  return new Date().toLocaleDateString();
}
