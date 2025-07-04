import _ from "lodash";
import { BaseSavedMeal, SavedMeal } from "./SavedMeal";
import { Today } from "./diary";

function includesAllWords(meal: BaseSavedMeal, words: string[]) {
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
function byDescription<T extends BaseSavedMeal>(meals: T[], searchTerm: string): T[] {
  const words = _.words(searchTerm);
  return _.filter(meals, m => includesAllWords(m, words));
}

export const search = {
  byDescription
}

const MAX_SAVED_COUNT = 200;

function save<T extends BaseSavedMeal>(meals: T[], meal: T): T[] {
  const newMeals = [meal, ...meals];
  if (newMeals.length > MAX_SAVED_COUNT) {
    return newMeals.slice(0, MAX_SAVED_COUNT);
  }
  return newMeals;
}

function selected<T extends BaseSavedMeal>(meals: T[], meal: T): {meals: T[], found: boolean} {
  const index = meals.findIndex(m => _.isEqual(m, meal));
  if (index === -1) {
    return { meals, found: false };
  }
  const selected = meals.splice(index, 1);
  meals.unshift(selected[0]);
  return { meals, found: true };
}

function remove<T extends BaseSavedMeal>(meals: T[], meal: T): T[] {
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

export interface SavedMealsLoader {
  load(): SavedMeal[];
}

export interface SavedMealsSaver {
  save(meals: SavedMeal[]): void;
}

export class SavedMeals {

  constructor(
    private readonly loader: SavedMealsLoader,
    private readonly saver: SavedMealsSaver,
    private readonly today: Today,
  ) {}

  add(meal: SavedMeal): SavedMeal[] {
    const meals = this.loader.load();
    const newMeals = mutation.save(meals, meal);
    this.saver.save(newMeals);
    return newMeals;
  }

  remove(meal: SavedMeal): SavedMeal[] {
    const meals = this.loader.load();
    const newMeals = mutation.remove(meals, meal);
    this.saver.save(newMeals);
    return newMeals;
  }

  select(meal: SavedMeal): SavedMeal[] {
    const meals = this.loader.load();
    const {meals: newMeals, found} = mutation.selected(meals, meal);
    this.saver.save(newMeals);
    if (found) {
      this.today.addSavedMeal(meal.foods);
    }
    return newMeals;
  }

  searchByDescription(searchTerm: string): SavedMeal[] {
    const meals = this.loader.load();
    return search.byDescription(meals, searchTerm);
  }
}