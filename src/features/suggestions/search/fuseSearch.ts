import Fuse from "fuse.js";
import _ from "lodash";
import { ScorePredicate } from "./ScorePredicate";

function searchByPhrase<T>(fuse: Fuse<T>, phrase: string, scorePredicate: ScorePredicate) {
  const match = (phrase: string) => fuse.search(phrase);
  return _.filter(match(phrase), scorePredicate) as { item: T; score?: number; }[];
}

export function search<T>(
  fuse: Fuse<T>,
  foodName: string,
  scorePredicate: ScorePredicate = () => true
) {
  return searchByPhrase(fuse, foodName, scorePredicate);
}

export function fuzzySearch<T>(list : T[]) {

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
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    keys: [
      "foodName",
    ]
  };
    
  return new Fuse<T>(list, options);
}
