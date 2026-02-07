import { savedFoods } from "./day-page/api";
import { savedMeals } from "./saved-meal";

export function init() {
  savedMeals.init();
  if (isSavedFoodEnabled()) {
    savedFoods.init();
  }
}

function isFeatureFlagEnabled(name: string): boolean {
  const query = new URLSearchParams(window.location.search);
  return query.has(name);
}

export function isSavedFoodEnabled() {
  return isFeatureFlagEnabled("saved-food-enabled");
}