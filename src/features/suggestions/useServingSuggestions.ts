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
  threshold: 0.2,
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

const matchFoodName = (name: string) => _.map(_.slice(fuse.search(name), 0, 2), "item");

const findFoodServingSuggestions = (foodDescription: string) => _.uniq(_.flatMap(foodNames(foodDescription), matchFoodName));

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