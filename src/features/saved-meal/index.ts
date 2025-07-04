import { SavedMealsLocalStorage } from "../../app/savedMealLocalStorage";
import { SavedMeals } from "../../model/savedMeals";
import { today } from "../day-page/api";

const savedMealLocalStorage = new SavedMealsLocalStorage();
export const savedMeals = new SavedMeals(savedMealLocalStorage, savedMealLocalStorage, today);