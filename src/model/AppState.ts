import { Meal } from "./Food";

export interface AppState {
  meals: Meal[];
  editState?: string;
}
