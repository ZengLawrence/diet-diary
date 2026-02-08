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
    const foods = this.load();
    const index = foods.findIndex(f => _.isEqual(f, food));
    if (index === -1) {
      return;
    }
    foods.splice(index, 1);
    this.saver.save(foods);
    this.suggestions.removeSuggestion(food);
  }

  removeByIndexes(indexes: number[]): void {
    const foods = this.load();
    indexes.forEach(index => {
      const food = foods[index];
      if (food) {
        this.suggestions.removeSuggestion(food);
      }
    });
    const remainingFoods = foods.filter((_, index) => !indexes.includes(index));
    this.saver.save(remainingFoods);
  }
  
  getAll(): Food[] {
    return this.load();
  }
}