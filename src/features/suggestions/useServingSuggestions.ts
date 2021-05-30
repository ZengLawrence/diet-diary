import Fuse from "fuse.js";
import _ from "lodash";
import { useState } from "react";

export interface ServingSuggestion {
  foodName: string;
  servingSize: string;
}

const SERVING_SUGGESTIONS: ServingSuggestion[] = [
  {
    foodName: "Cucumber",
    servingSize: "1 cup sliced / 1 medium"
  },
  {
    foodName: "Lettuce",
    servingSize: "2 cups chopped"
  },
]

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

const fuse = new Fuse(SERVING_SUGGESTIONS, options);

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