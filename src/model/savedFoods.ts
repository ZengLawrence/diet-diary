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

  add(food: Food): void {
    this.saver.save([food].concat(this.load()));
  }

  getAll(): Food[] {
    return this.load();
  }
}