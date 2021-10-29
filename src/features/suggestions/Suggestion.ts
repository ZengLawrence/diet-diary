import { Serving } from '../../model/Food';

export interface Suggestion {
  foodName: string;
  amount?: string;
  serving?: Serving;
  bestChoice?: boolean;
}

export function createSuggestion(foodName: string, amount?: string) {
  return amount ? { foodName, amount } : { foodName };
}
