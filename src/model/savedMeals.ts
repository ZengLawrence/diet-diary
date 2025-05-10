import _ from "lodash";

interface SavedMeal {
  foods: { description: string }[];
}

function includesAllWords(meal: SavedMeal, words: string[]) {
  const foodDescriptions = _.map(meal.foods, f => _.lowerCase(f.description));
  const lowerCaseWords = words.map(w => _.lowerCase(w));
  const wordIncludedInFoodDescription = (word: string) => foodDescriptions.some(desc => desc.includes(word));
  return lowerCaseWords.every(wordIncludedInFoodDescription);
}

/**
 * Filters meals based on a search term, returning only those that contain all words in the term. Comparison is case-insensitive.
 * 
 * @param meals - Array of meals to filter.
 * @param searchTerm - The search term to match against meal descriptions.
 * @returns An array of meals that match the search term.
 */
function byDescription<T extends SavedMeal>(meals: T[], searchTerm: string): T[] {
  const words = _.words(searchTerm);
  return _.filter(meals, m => includesAllWords(m, words));
}

export const search = {
  byDescription
}