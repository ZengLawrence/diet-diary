import Fuse from "fuse.js";
import _ from "lodash";
import servings from "./servings";
import { ServingSuggestion } from "../ServingSuggestion";
import { search } from "../fuzzySearch";

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
  _.map(_.slice(search(fuse, foodName), 0, 2), "item");
