import { Food } from "./Food";

interface Suggestions {
  addSuggestion(meal: { foods: Food[]; }): void;
  addSuggestions(savedMeals: { foods: Food[]; }[]): void;
  removeSuggestion(meal: { foods: Food[]; }): void;
}