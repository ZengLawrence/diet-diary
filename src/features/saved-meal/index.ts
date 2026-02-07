import { SavedMealsLocalStorage } from "../../app/savedMealLocalStorage";
import { SavedMeals } from "../../model/savedMeals";
import { today } from "../day-page/api";
import { isSavedFoodEnabled } from "../flags";
import { suggestions } from "../suggestions/SavedMealSuggestion";

const savedMealLocalStorage = new SavedMealsLocalStorage();

type SuggestionsType = typeof suggestions;
let _suggestions: SuggestionsType = {
  addSuggestions: () => { },
  addSuggestion: () => { },
  removeSuggestion: () => { },
}
if (!isSavedFoodEnabled()) {
  _suggestions = suggestions;
}

export const savedMeals = new SavedMeals(savedMealLocalStorage, savedMealLocalStorage, today, _suggestions);
