import { savedMeals } from "./saved-meal";

export function init() {
  savedMeals.init();
}

export function isFeatureFlagEnabled(name: string): boolean {
  const query = new URLSearchParams(window.location.search);
  return query.has(name);
}