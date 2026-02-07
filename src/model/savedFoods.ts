import _ from "lodash";
import { NoOpsSuggestions, type Suggestions } from "../features/suggestions/SavedFoodSuggestion";
import type { Food } from "./Food";

export interface SavedFoodsLoader {
  load(): Food[];
}

export interface SavedFoodsSaver {
  save(foods: Food[]): void;
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
    this.saver.save([food].concat(this.load()));
    this.suggestions.addSuggestion(food);
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

  getAll(): Food[] {
    return this.load();
  }
}