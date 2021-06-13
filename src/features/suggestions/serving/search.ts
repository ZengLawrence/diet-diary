import Fuse from "fuse.js";
import _ from "lodash";
import servings from "./servings";
import { ServingSuggestion } from "../ServingSuggestion";
import { search, scoreLessThan } from "../fuzzySearch";

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

const fuse = new Fuse<ServingSuggestion>(servings, options);

export const searchFoodServingSize = (foodName: string) =>
  _.map(search(fuse, _.words(foodName), scoreLessThan(0.40)), "item");
