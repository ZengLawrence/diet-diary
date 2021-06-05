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
  includeScore: true,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  minMatchCharLength: 3,
  // location: 0,
  // threshold: 0.6,
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

const confidence = (level: number) => {
  return function (res: { score: number }) {
    return res.score < (1 - level);
  }
}

const foodServings = (name: string) => _.map(_.filter(search(_.words(name)), confidence(0.60)), "item");

const searchExpression = (words: string[]) => ({
  $and: _.map(words, w => ({ "foodName": w }))
})

const match = (words: string[]) => fuse.search(searchExpression(words));

const search = (words: string[]) => {
  const res = match(words);
  if (_.size(res) === 0 && _.size(words) > 1) {
    const dropLastWord = () => _.take(words, _.size(words) - 1);
    return match(dropLastWord());
  }
  return res;
}

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