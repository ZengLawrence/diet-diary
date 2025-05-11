import _ from "lodash";
import { SavedMeal } from "./SavedMeal";

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

const MAX_SAVED_COUNT = 200;

function save<T extends SavedMeal>(meals: T[], meal: T): T[] {
  const newMeals = [meal, ...meals];
  if (newMeals.length > MAX_SAVED_COUNT) {
    return newMeals.slice(0, MAX_SAVED_COUNT);
  }
  return newMeals;
}

function selected<T extends SavedMeal>(meals: T[], meal: T): T[] {
  const index = meals.findIndex(m => _.isEqual(m, meal));
  if (index === -1) {
    return meals;
  }
  const selected = meals.splice(index, 1);
  meals.unshift(selected[0]);
  return meals;
}

function remove<T extends SavedMeal>(meals: T[], meal: T): T[] {
  const index = meals.findIndex(m => _.isEqual(m, meal));
  if (index === -1) {
    return meals;
  }
  meals.splice(index, 1);
  return meals;
}

export const mutation = {
  save,
  selected,
  remove,
}

export default mutation;