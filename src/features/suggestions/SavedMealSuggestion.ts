import _ from "lodash";
import decompose from "./parser/DecomposedFoodDescription";
import { addOrReplace } from "./search/foodNameSearch";
import { PredefinedSuggestion } from "./search/PredefinedSuggestion";
import { Food } from "../../model/Food";

function isSingleFoodMeal(meal: { foods: Food[]; }): boolean {
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

export function addSuggestions(savedMeals: { foods: Food[]; }[]) {
  _.filter(savedMeals, isSingleFoodMeal)
    .flatMap(meal => meal.foods)
    .map(toSuggestion)
    .forEach(suggestion =>
      addOrReplace(suggestion)
    );
}

export function addSuggestion(meal: { foods: Food[]; }) {
  if (isSingleFoodMeal(meal)) {
    addOrReplace(toSuggestion(meal.foods[0]));
  }
}