import _ from "lodash";
import { Food } from "../../model/Food";
import decompose from "./parser/food-description-regex-parser";
import { addOrReplace, remove } from "./search/foodNameSearch";
import { PredefinedSuggestion } from "./search/PredefinedSuggestion";
import { Suggestions } from "../../model/suggestions";

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

function addSuggestions(savedMeals: { foods: Food[]; }[]) {
  _.filter(savedMeals, isSingleFoodMeal)
    .flatMap(meal => meal.foods)
    .map(toSuggestion)
    .forEach(suggestion =>
      addOrReplace(suggestion)
    );
}

function addSuggestion(meal: { foods: Food[]; }): void {
  if (isSingleFoodMeal(meal)) {
    addOrReplace(toSuggestion(meal.foods[0]));
  }
}

function removeSuggestion(meal: { foods: Food[]; }): void {
  if (isSingleFoodMeal(meal)) {
    remove(toSuggestion(meal.foods[0]));
  }
}

export const suggestions: Suggestions = {
  addSuggestions,
  addSuggestion,
  removeSuggestion
};