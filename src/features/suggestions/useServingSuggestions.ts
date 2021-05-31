import Fuse from "fuse.js";
import _ from "lodash";
import { useState } from "react";
import { FoodGroup } from "../../model/Food";
import servings from "./servings";

export interface ServingSuggestion {
  foodName: string;
  servingSize: string;
  foodGroup: FoodGroup;
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

const foodName = (phrase: string) => _.map(_.split(phrase, /\d/, 1), _.trim);

const foodNames = (foodDescription: string) => _.flatMap(_.split(foodDescription, ","), foodName);

const foodServings = (name: string) => _.map(fuse.search(name), "item");

function findFoodServingSuggestions(foodDescription: string) {
  const names = foodNames(foodDescription);
  const maxItems = (items: any[]) => _.slice(items, 0, _.size(names) > 1 ? 2 : 5);
  const result = _.map(_.map(names, foodServings), maxItems);
  return _.uniq(_.flatMap(result));
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