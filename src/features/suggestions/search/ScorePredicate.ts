export type ScorePredicate = (res: { score: number; }) => boolean;

export const scoreLessThan = (limit: number) => {
  return function ({ score }: { score: number; }) {
    return score < limit;
  };
};
