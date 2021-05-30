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

const matchFoodName = (word: string) => _.map(_.slice(fuse.search(word), 0, 2), "item");

const findFoodServingSuggestions = (foodName: string) => _.uniq(_.flatMap(_.words(foodName), matchFoodName));

export const useServingSuggestions = () => {
  const [suggestions, setSuggestions] = useState([] as ServingSuggestion[]);
  const generateSuggestions = (foodName: string) => {
    setSuggestions(findFoodServingSuggestions(foodName));
  }

  return {
    suggestions,
    generateSuggestions
  };
}