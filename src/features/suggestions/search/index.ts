import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { foodName } from '../parser/foodName';
import { autoComplete, searchFoodServingPortionSize } from './search';

export type Suggestion = string 
  | {
    foodName: string;
    amount: string;
    serving: Serving;
    bestChoice?: boolean;
  };

export function isSuggestion(suggestion: Suggestion): suggestion is {
  foodName: string;
  amount: string;
  serving: Serving;
  bestChoice?: boolean;
} {
  return typeof suggestion === "object" && "amount" in suggestion;
}

function findSuggestions(foodDescription: string) {
  const results = searchFoodServingPortionSize(foodName(foodDescription));
  return _.slice(results, 0, 5);
}

function isFoodNameComplete(foodDescription: string) {
  return _.size(foodDescription) > _.size(foodName(foodDescription));
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
  const autoCompletions: Suggestion[] = isFoodNameComplete(foodDescription) ? [foodDescription] : findNameSuggestions(foodDescription);
  return callback(_.concat(autoCompletions, findSuggestions(foodDescription)));
}
