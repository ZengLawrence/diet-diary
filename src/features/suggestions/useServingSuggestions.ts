import Fuse from "fuse.js";
import _ from "lodash";
import { useState } from "react";
import { FoodGroup } from "../../model/Food";
import servings from "./servings";

export interface ServingSuggestion {
  foodName: string;
  servingSize: string;
  foodGroup: FoodGroup;
  bestChoice?: boolean;
}

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  minMatchCharLength: 3,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: [
    "foodName",
  ]
};

const fuse = new Fuse(servings, options);

const ingredientName = (phrase: string) => _.map(_.split(phrase, /\d/, 1), _.trim);

const ingredients = (foodDescription: string) => _.flatMap(_.split(foodDescription, ","), ingredientName);

const foodServings = (name: string) => _.map(search(_.words(name)), "item");

const search = (words: string[]) => {
  const res = fuse.search(searchExpression(words));
  if (_.size(res) === 0) {
    const dropLastWord = () => _.take(words, _.size(words) - 1);
    return fuse.search(searchExpression(dropLastWord()));
  }
  return res;
}

const searchExpression = (words: string[]) => ({
  $and: _.map(words, w => ({ "foodName": w }))
})

function findFoodServingSuggestions(foodDescription: string) {
  const _ingredients = ingredients(foodDescription);
  const lastIngredient = (index: number) => (index === _.size(_ingredients) - 1);
  const maxItems = (items: any[], index: number) => _.slice(items, 0, lastIngredient(index) ? 5 : 2);

  const results = _.map(_ingredients, foodServings);
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