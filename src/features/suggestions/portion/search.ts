import Fuse from "fuse.js";
import _ from "lodash";
import { search } from "../fuzzySearch";
import { PortionSuggestion } from "../PortionSuggestion";
import { servings } from "./portion-serving.json";

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

const fuse = new Fuse<PortionSuggestion>(servings, options);

export const searchFoodPortionSize = (foodName: string) =>
  _.map(search(fuse, _.words(foodName)), "item");
