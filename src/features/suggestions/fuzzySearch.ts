import Fuse from "fuse.js";
import _ from "lodash";

type ScorePredicate = (res: { score: number; }) => boolean;

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

export const scoreLessThan = (limit: number) => {
  return function ({ score }: { score: number; }) {
    return score < limit;
  };
}
