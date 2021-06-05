import _ from "lodash";
import { useState } from "react";
import { FoodGroup } from "../../model/Food";
import { searchFoodServingSize } from "./search";

export interface ServingSuggestion {
  foodName: string;
  servingSize: string;
  foodGroup: FoodGroup;
  bestChoice?: boolean;
}

const ingredientName = (phrase: string) => _.map(_.split(phrase, /\d/, 1), _.trim);

const ingredients = (foodDescription: string) => _.flatMap(_.split(foodDescription, ","), ingredientName);

function findFoodServingSuggestions(foodDescription: string) {
  const _ingredients = ingredients(foodDescription);
  const lastIngredient = (index: number) => (index === _.size(_ingredients) - 1);
  const maxItems = (items: any[], index: number) => _.slice(items, 0, lastIngredient(index) ? 5 : 2);

  const results = _.map(_ingredients, ingredient => searchFoodServingSize(_.words(ingredient)));
  return _.uniq(_.flatMap(_.map(results, maxItems)));
}

export const useServingSuggestions = () => {
  const [suggestions, setSuggestions] = useState([] as ServingSuggestion[]);
  const generateSuggestions = (foodDescription: string) => {
    setSuggestions(findFoodServingSuggestions(foodDescription));
  }

  return {
    suggestions,
    generateSuggestions
  };
}