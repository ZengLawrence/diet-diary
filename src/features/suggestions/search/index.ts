import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { parseFoodDescription } from '../parser/foodDescription';
import { autoComplete, searchFoodServingPortionSize } from './search';

export interface Suggestion {
  foodName: string;
  amount?: string;
  serving?: Serving;
  bestChoice?: boolean;
};

function findSuggestions(foodName: string) {
  const results = searchFoodServingPortionSize(foodName);
  return _.slice(results, 0, 5);
}

function findNameSuggestions(foodName: string) {
  const results = autoComplete(foodName)
    .map(foodName => ({ foodName }));
  return _.size(results) === 0 ? [{ foodName }] : _.slice(results, 0, 5);
}

function combine(autoCompletions: Suggestion[], suggestions: Suggestion[]) {
  const autoSuggestions = _.size(autoCompletions) === 1 ? [{...suggestions[0], ...autoCompletions[0]}] : [];
  return _.concat(autoCompletions, autoSuggestions, suggestions)
    .slice(0, 5);
}

export function generateSuggestions(
  descRef: React.MutableRefObject<String>,
  callback: (suggestions: Suggestion[]) => void
) {
  const { foodName, amount } = parseFoodDescription(descRef.current + "") as
    {
      foodName: string,
      amount?: string
    };
  const autoCompletions: Suggestion[] = amount ? [{ foodName, amount }] : findNameSuggestions(foodName);
  return callback(combine(autoCompletions, findSuggestions(foodName)));
}
