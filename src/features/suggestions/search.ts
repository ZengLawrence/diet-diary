import Fuse from "fuse.js";
import _ from "lodash";
import servings from "./servings";

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

const searchExpression = (words: string[]) => ({
  $and: _.map(words, w => ({ "foodName": w }))
});

const match = (words: string[]) => fuse.search(searchExpression(words));

const search = (words: string[], scorePredicate: (res: { score: number; }) => boolean) : any[] => {
  const res = _.filter(match(words), scorePredicate);
  if (_.size(res) === 0 && _.size(words) > 1) {
    const dropLastWord = () => _.take(words, _.size(words) - 1);
    return search(dropLastWord(), scorePredicate);
  }
  return res;
};

const scoreLessThan = (limit: number) => {
  return function ({ score }: { score: number; }) {
    return score < limit;
  };
};

export const searchFoodServingSize = (foodName: string) =>
  _.map(search(_.words(foodName), scoreLessThan(0.40)), "item");
