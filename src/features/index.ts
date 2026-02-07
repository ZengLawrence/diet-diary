import { savedFoods } from "./day-page/api";
import { isSavedFoodEnabled } from "./flags";
import { savedMeals } from "./saved-meal";

export function init() {
  savedMeals.init();
  if (isSavedFoodEnabled()) {
    savedFoods.init();
    migrateSavedFoods();
  }
}

function migrateSavedFoods() {
  const existingSavedFoods = savedFoods.getAll();
  if (existingSavedFoods.length === 0) {
    const foods = savedMeals.getSingleFoodSavedMeals().flatMap(meal => meal.foods);
    if (foods.length > 0) {
      savedFoods.addAll(foods);
    }
    savedMeals.removeSingleFoodSavedMeals();
  }
}