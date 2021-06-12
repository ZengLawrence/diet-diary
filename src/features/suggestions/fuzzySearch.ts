import Fuse from "fuse.js";
import _ from "lodash";

const searchExpression = (words: string[]) => ({
  $and: _.map(words, w => ({ "foodName": w }))
})

export function search<T>(fuse: Fuse<T>, words: string[], scorePredicate: (res: { score: number; }) => boolean): { item: T; score?: number; }[] {
  const match = (words: string[]) => fuse.search(searchExpression(words));

  const res = _.filter(match(words), scorePredicate) as { item: T; score?: number; }[];
  if (_.size(res) === 0 && _.size(words) > 1) {
    const dropLastWord = () => _.take(words, _.size(words) - 1);
    return search(fuse, dropLastWord(), scorePredicate);
  }
  return res;
}

export const scoreLessThan = (limit: number) => {
  return function ({ score }: { score: number; }) {
    return score < limit;
  };
}
