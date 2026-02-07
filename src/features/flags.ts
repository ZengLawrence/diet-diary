function isFeatureFlagEnabled(name: string): boolean {
  const query = new URLSearchParams(window.location.search);
  return query.has(name);
}

export function isSavedFoodEnabled() {
  return isFeatureFlagEnabled("saved-food-enabled");
}
