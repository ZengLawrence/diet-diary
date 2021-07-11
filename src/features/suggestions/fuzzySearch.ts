import Fuse from "fuse.js";
import _ from "lodash";

const searchExpression = (words: string[]) => ({
  $and: _.map(words, w => ({ "foodName": w }))
})

const dropLastWord = (phrase: string) => {
  const lastWord = _.last(_.words(phrase)) || "";
  const lastWordIndex = phrase.lastIndexOf(lastWord);
  return _.trim(phrase.substring(0, lastWordIndex));
}

type ScorePredicate = (res: { score: number; }) => boolean;

function searchByPhrase<T>(fuse: Fuse<T>, phrase: string, scorePredicate: ScorePredicate) {
  const match = (phrase: string) => fuse.search(phrase);
  return _.filter(match(phrase), scorePredicate);
}

function searchByWords<T>(fuse: Fuse<T>, words: string[], scorePredicate: ScorePredicate) {
  const match = (words: string[]) => fuse.search(searchExpression(words));
  return _.filter(match(words), scorePredicate);
}

export function search<T>(
  fuse: Fuse<T>,
  foodName: string,
  scorePredicate: ScorePredicate = () => true
): { item: T; score?: number; }[] {

  const resByPhrase = searchByPhrase(fuse, foodName, scorePredicate) as { item: T; score?: number; }[];
  if (_.size(resByPhrase) > 0) {
    return resByPhrase;
  }
  const words = _.words(foodName);
  const resByWords = searchByWords(fuse, words, scorePredicate) as { item: T; score?: number; }[];
  if (_.size(resByWords) === 0 && _.size(words) > 1) {
    return search(fuse, dropLastWord(foodName), scorePredicate);
  }
  return resByWords;
}

export const scoreLessThan = (limit: number) => {
  return function ({ score }: { score: number; }) {
    return score < limit;
  };
}
