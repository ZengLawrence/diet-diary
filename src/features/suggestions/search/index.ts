import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { parseFoodDescription } from '../parser/foodDescription';
import { foodName } from '../parser/foodName';
import { autoComplete, searchFoodServingPortionSize } from './search';

export type Suggestion = string
  | {
    foodName: string;
    amount?: string;
    serving: Serving;
    bestChoice?: boolean;
  };

export function isSuggestion(suggestion: Suggestion): suggestion is {
  foodName: string;
  amount?: string;
  serving: Serving;
  bestChoice?: boolean;
} {
  return typeof suggestion === "object" && "amount" in suggestion;
}

function findSuggestions(foodName: string) {
  const results = searchFoodServingPortionSize(foodName);
  return _.slice(results, 0, 5);
}

function findNameSuggestions(foodDescription: string) {
  const results = autoComplete(foodName(foodDescription));
  return _.size(results) === 0 ? [foodDescription] : _.slice(results, 0, 5);
}

export function generateSuggestions(
  descRef: React.MutableRefObject<String>,
  callback: (suggestions: Suggestion[]) => void
) {
  const foodDescription = descRef.current + "";
  const { foodName, amount } = parseFoodDescription(foodDescription) as
    {
      foodName: string,
      amount?: string
    };
  const autoCompletions: Suggestion[] = amount ? [foodDescription] : findNameSuggestions(foodName);
  return callback(_.concat(autoCompletions, findSuggestions(foodName)));
}
