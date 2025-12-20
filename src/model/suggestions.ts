import type { Food } from "./Food";

export interface Suggestions {
  addSuggestion(meal: { foods: Food[]; }): void;
  addSuggestions(savedMeals: { foods: Food[]; }[]): void;
  removeSuggestion(meal: { foods: Food[]; }): void;
}