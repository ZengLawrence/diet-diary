import _ from "lodash";
import { SavedMeal } from "../saved-meal/SavedMeal";
import decompose from "./parser/DecomposedFoodDescription";
import { addOrReplace } from "./search/foodNameSearch";
import { PredefinedSuggestion } from "./search/PredefinedSuggestion";
import { Food } from "../../model/Food";

function isSingleFoodMeal(meal: SavedMeal): boolean {
  const { foods } = meal;
  return (_.size(foods) === 1) && (_.size(foods[0].description) > 1);
}

function toSuggestion(food: Food): PredefinedSuggestion {
  const { description, serving } = food;
  console.log(description);
  const { foodName, amount } = decompose(description);
  return {
    foodName,
    amount: _.toString(amount),
    serving
  }
}

export function addSavedMeals(savedMeals: SavedMeal[]) {
  _.filter(savedMeals, isSingleFoodMeal)
    .flatMap(meal => meal.foods)
    .map(toSuggestion)
    .forEach(suggestion =>
      addOrReplace(suggestion)
    );
}
