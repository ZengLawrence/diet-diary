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

const search = (words: string[], confidenceLevel: (res: { score: number; }) => boolean) => {
  const res = _.filter(match(words), confidenceLevel);
  if (_.size(res) === 0 && _.size(words) > 1) {
    const dropLastWord = () => _.take(words, _.size(words) - 1);
    return _.filter(match(dropLastWord()), confidenceLevel);
  }
  return res;
};

const confidence = (level: number) => {
  return function (res: { score: number; }) {
    return res.score < (1 - level);
  };
};

export const searchFoodServingSize = (words: string[]) =>
  _.map(search(words, confidence(0.60)), "item");
