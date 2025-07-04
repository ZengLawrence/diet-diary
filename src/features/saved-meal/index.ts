import { SavedMealsLocalStorage } from "../../app/savedMealLocalStorage";
import { SavedMeals } from "../../model/savedMeals";
import { today } from "../day-page/api";
import { suggestions } from "../suggestions/SavedMealSuggestion";

const savedMealLocalStorage = new SavedMealsLocalStorage();
export const savedMeals = new SavedMeals(savedMealLocalStorage, savedMealLocalStorage, today, suggestions);