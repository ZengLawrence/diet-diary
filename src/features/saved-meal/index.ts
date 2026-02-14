import { SavedMealsLocalStorage } from "../../app/savedMealLocalStorage";
import { SavedMeals } from "../../model/savedMeals";
import { today } from "../day-page/api";
import { suggestions } from "../suggestions/SavedMealSuggestion";

const savedMealLocalStorage = new SavedMealsLocalStorage();

type SuggestionsType = typeof suggestions;
let _suggestions: SuggestionsType = {
  addSuggestions: () => { },
  addSuggestion: () => { },
  removeSuggestion: () => { },
}
// TODO remove adding Saved Meal to suggestion search
_suggestions = suggestions;

export const savedMeals = new SavedMeals(savedMealLocalStorage, savedMealLocalStorage, today, _suggestions);
