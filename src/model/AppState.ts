import { Meal, newMeal } from "./Food";
import { DEFAULT_TARGET, Target } from "./Target";

export interface AppState {
  date: string;
  mealStates: MealState[];
  editMode: boolean;
  target: Target;
  editTarget: boolean;
  compactView: boolean;
}

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

export function initialState(): AppState {
  return {
    date: today(),
    mealStates: [newMealState()],
    editMode: true,
    target: DEFAULT_TARGET,
    editTarget: false,
    compactView: true,
  };
}