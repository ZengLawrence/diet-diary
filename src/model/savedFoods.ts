import _ from "lodash";
import { NoOpsSuggestions, type Suggestions } from "../features/suggestions/SavedFoodSuggestion";
import type { Food } from "./Food";

export interface SavedFoodsLoader {
  load(): Food[];
}

export interface SavedFoodsSaver {
  save(foods: Food[]): void;
}

function add(foods: Food[], food: Food): Food[] {
  const dedupedFoods = foods.filter(f => f.description !== food.description);
  return [food].concat(dedupedFoods);
}

function addAll(foods: Food[], newFoods: Food[]): Food[] {
  let updatedFoods = foods;
  // keep same order if add in batch
  [...newFoods].reverse().forEach(food => {
    updatedFoods = add(updatedFoods, food);
  });
  return updatedFoods;
}

function remove(foods: Food[], foodToRemove: Food): {updatedFoods: Food[], removed: boolean} {
  const updatedFoods = foods.filter(food => food.description !== foodToRemove.description);
  return { updatedFoods, removed: updatedFoods.length < foods.length };
}

function removeAll(foods: Food[], foodsToRemove: Food[]): { updatedFoods: Food[], removedFoods: Food[] } {
  let updatedFoods = foods;
  const removedFoods: Food[] = [];
  foodsToRemove.forEach(food => {
    const { updatedFoods: updatedFoodsAfterRemove, removed } = remove(updatedFoods, food);
    updatedFoods = updatedFoodsAfterRemove;
    if (removed) {
      removedFoods.push(food);
    }
  });
  return { updatedFoods, removedFoods };
}


function includesAllWords(food: { description: string }, words: string[]) {
  const foodDescription = _.lowerCase(food.description);
  const lowerCaseWords = words.map(w => _.lowerCase(w));
  const wordIncludedInFoodDescription = (word: string) => foodDescription.includes(word);
  return lowerCaseWords.every(wordIncludedInFoodDescription);
}

/**
 * Filters foods based on a search term, returning only those that contain all words in the term. Comparison is case-insensitive.
 * 
 * @param foods - Array of foods to filter.
 * @param searchTerm - The search term to match against food descriptions.
 * @returns An array of foods that match the search term.
 */
function byDescription(foods: Food[], searchTerm: string): Food[] {
  const words = _.words(searchTerm);
  return _.filter(foods, f => includesAllWords(f, words));
}

export class SavedFoods {

  constructor(
    private readonly loader: SavedFoodsLoader,
    private readonly saver: SavedFoodsSaver,
    private readonly suggestions: Suggestions = NoOpsSuggestions,
  ) { }

  private load(): Food[] {
    return this.loader.load();
  }

  init() {
    this.suggestions.addSuggestions(this.load());
  }

  add(food: Food): void {
    this.saver.save(add(this.load(), food));
    this.suggestions.addSuggestion(food);
  }

  addAll(foods: Food[]): void {
    this.saver.save(addAll(this.load(), foods));
    foods.forEach(food => this.suggestions.addSuggestion(food));
  }

  remove(food: Food): void {
    const existingFoods = this.load();
    const { updatedFoods, removed } = remove(existingFoods, food);
    this.saver.save(updatedFoods);
    if (removed) {
      this.suggestions.removeSuggestion(food);
    }
  }

  removeAll(foods: Food[]): void {
    const { updatedFoods, removedFoods } = removeAll(this.load(), foods);
    this.saver.save(updatedFoods);
    if (removedFoods.length > 0) {
      removedFoods.forEach(food => this.suggestions.removeSuggestion(food));
    }
  }

  getAll(): Food[] {
    return this.load();
  }

  searchByDescription(searchTerm: string): Food[] {
    const foods = this.load();
    return byDescription(foods, searchTerm);
  }
}