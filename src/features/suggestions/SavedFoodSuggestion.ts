import _ from "lodash";
import type { Food } from "../../model/Food";
import decompose from "./parser/food-description-regex-parser";
import { addOrReplace, remove } from "./search/foodNameSearch";
import type { PredefinedSuggestion } from "./search/PredefinedSuggestion";

function toSuggestion(food: Food): PredefinedSuggestion {
  const { description, serving, bestChoice } = food;
  const { foodName, amount } = decompose(description);
  return {
    foodName,
    amount: _.toString(amount),
    serving,
    bestChoice
  }
}

function addSuggestion(food: Food): void {
  addOrReplace(toSuggestion(food));
}

function removeSuggestion(food: Food): void {
  remove(toSuggestion(food));
}

export const suggestions = {
  addSuggestion,
  removeSuggestion
};

export type Suggestions = typeof suggestions;

export const NoOpsSuggestions: Suggestions = {
  addSuggestion: () => { },
  removeSuggestion: () => { }
};