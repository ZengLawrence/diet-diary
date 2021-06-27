import Fuse from "fuse.js";
import _ from "lodash";
import { scoreLessThan, search } from "../fuzzySearch";
import { PortionSuggestion } from "../PortionSuggestion";
import portions from "./portions";

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

const fuse = new Fuse<PortionSuggestion>(portions, options);

export const searchFoodPortionSize = (foodName: string) =>
  _.slice(_.map(search(fuse, _.words(foodName), scoreLessThan(0.6)), "item"), 0, 2);
