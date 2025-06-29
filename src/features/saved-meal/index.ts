import { SavedMealsLocalStorage } from "../../app/savedMealLocalStorage";
import { SavedMeals } from "../../model/savedMeals";

const savedMealLocalStorage = new SavedMealsLocalStorage();
export const savedMeals = new SavedMeals(savedMealLocalStorage, savedMealLocalStorage);