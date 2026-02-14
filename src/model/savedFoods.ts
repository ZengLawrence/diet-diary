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

function remove(foods: Food[], foodToRemove: Food): Food[] {
  return foods.filter(food => food.description !== foodToRemove.description);
}

function removeAll(foods: Food[], foodsToRemove: Food[]): { updatedFoods: Food[], removedFoods: Food[] } {
  let updatedFoods = foods;
  const removedFoods: Food[] = [];
  foodsToRemove.forEach(food => {
    const beforeCount = updatedFoods.length;
    updatedFoods = remove(updatedFoods, food);
    if (updatedFoods.length < beforeCount) {
      removedFoods.push(food);
    }
  });
  return { updatedFoods, removedFoods };
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
    const updatedFoods = remove(existingFoods, food);
    this.saver.save(updatedFoods);
    if (existingFoods.length !== updatedFoods.length) {
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
}