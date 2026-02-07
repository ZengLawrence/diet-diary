import { savedFoods } from "./day-page/api";
import { savedMeals } from "./saved-meal";

export function init() {
  savedMeals.init();
  if (isSavedFoodEnabled()) {
    savedFoods.init();
    migrateSavedFoods();
  }
}

function isFeatureFlagEnabled(name: string): boolean {
  const query = new URLSearchParams(window.location.search);
  return query.has(name);
}

export function isSavedFoodEnabled() {
  return isFeatureFlagEnabled("saved-food-enabled");
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