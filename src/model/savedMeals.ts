import _ from "lodash";
import type { SavedMeal } from "./SavedMeal";
import type { Today } from "./today";
import type { DayPage } from "./DayPage";
import type { Suggestions } from "./suggestions";

function includesAllWords(meal: { foods: { description: string }[] }, words: string[]) {
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
function byDescription(meals: SavedMeal[], searchTerm: string): SavedMeal[] {
  const words = _.words(searchTerm);
  return _.filter(meals, m => includesAllWords(m, words));
}

export const search = {
  byDescription
}

const MAX_SAVED_COUNT = 200;

function save(meals: SavedMeal[], meal: SavedMeal): SavedMeal[] {
  const newMeals = [meal, ...meals];
  if (newMeals.length > MAX_SAVED_COUNT) {
    const indexToRemove = newMeals.findIndex(sm => sm.foods.length > 1)
    if (indexToRemove == -1) {
      return newMeals.slice(0, MAX_SAVED_COUNT);
    } else {
      newMeals.splice(indexToRemove, 1);
      return newMeals;
    }
  }
  return newMeals;
}

function selected(meals: SavedMeal[], meal: SavedMeal): {meals: SavedMeal[], found: boolean} {
  const index = meals.findIndex(m => _.isEqual(m, meal));
  if (index === -1) {
    return { meals, found: false };
  }
  const selected = meals.splice(index, 1);
  meals.unshift(selected[0]);
  return { meals, found: true };
}

function remove(meals: SavedMeal[], meal: SavedMeal): SavedMeal[] {
  const index = meals.findIndex(m => _.isEqual(m, meal));
  if (index === -1) {
    return meals;
  }
  meals.splice(index, 1);
  return meals;
}

export interface SavedMealsLoader {
  load(): SavedMeal[];
}

export interface SavedMealsSaver {
  save(meals: SavedMeal[]): void;
}

export interface SavedMealsChangeListener {
  added: () => void;
  deleted: () => void;
}
export class SavedMeals {
  private listener: SavedMealsChangeListener | undefined;

  constructor(
    private readonly loader: SavedMealsLoader,
    private readonly saver: SavedMealsSaver,
    private readonly today: Today,
    private readonly suggestions: Suggestions,
  ) { }

  init() {
    this.suggestions.addSuggestions(this.loader.load());
  }
  register(listener: SavedMealsChangeListener): void {
    this.listener = listener;
  }

  unregister(listener: SavedMealsChangeListener): void {
    if (this.listener == listener) {
      this.listener = undefined;
    }
  }

  add(meal: SavedMeal): SavedMeal[] {
    const meals = this.loader.load();
    const newMeals = save(meals, meal);
    this.saver.save(newMeals);
    this.suggestions.addSuggestion(meal);
    this.listener?.added();
    return newMeals;
  }

  remove(meal: SavedMeal): SavedMeal[] {
    const meals = this.loader.load();
    const mealCount = _.size(meals);
    const newMeals = remove(meals, meal);
    this.saver.save(newMeals);
    this.suggestions.removeSuggestion(meal);
    if (_.size(newMeals) < mealCount) {
      this.listener?.deleted();
    }
    return newMeals;
  }

  select(meal: SavedMeal, callback: (today: DayPage) => void): SavedMeal[] {
    const meals = this.loader.load();
    const {meals: newMeals, found} = selected(meals, meal);
    this.saver.save(newMeals);
    if (found) {
      const updatedToday = this.today.addSavedMeal(meal.foods);
      callback(updatedToday);
    }
    return newMeals;
  }

  searchByDescription(searchTerm: string): SavedMeal[] {
    const meals = this.loader.load();
    return search.byDescription(meals, searchTerm);
  }

  getSingleFoodSavedMeals(): SavedMeal[] {
    const meals = this.loader.load();
    return meals.filter(m => m.foods.length === 1);
  }
  
}