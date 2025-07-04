import _ from "lodash";
import { Food } from "../../model/Food";
import decompose from "./parser/DecomposedFoodDescription";
import { addOrReplace, remove } from "./search/foodNameSearch";
import { PredefinedSuggestion } from "./search/PredefinedSuggestion";

function isSingleFoodMeal(meal: { foods: Food[]; }): boolean {
  const { foods } = meal;
  return (_.size(foods) === 1) && (_.size(foods[0].description) > 1);
}

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

export function addSuggestions(savedMeals: { foods: Food[]; }[]) {
  _.filter(savedMeals, isSingleFoodMeal)
    .flatMap(meal => meal.foods)
    .map(toSuggestion)
    .forEach(suggestion =>
      addOrReplace(suggestion)
    );
}

export function addSuggestion(meal: { foods: Food[]; }): void {
  if (isSingleFoodMeal(meal)) {
    addOrReplace(toSuggestion(meal.foods[0]));
  }
}

export function removeSuggestion(meal: { foods: Food[]; }): void {
  if (isSingleFoodMeal(meal)) {
    remove(toSuggestion(meal.foods[0]));
  }
}

export const suggestions = {
  addSuggestions,
  addSuggestion,
  removeSuggestion
};