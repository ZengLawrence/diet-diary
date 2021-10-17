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

function createAutoSuggestion(nameSuggestion: Suggestion, suggestion: Suggestion) {
  return {
    ...suggestion,
    ...nameSuggestion
  }
}

function generateAutoSuggestions(autoCompletions: Suggestion[], suggestions: Suggestion[], foodName: string) {
  const shouldGenerate = _.size(autoCompletions) === 1
    && _.size(suggestions) > 0
    && !(foodName === suggestions[0].foodName);
  return shouldGenerate ? [createAutoSuggestion(autoCompletions[0], suggestions[0])] : [];
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
  const suggestions = findSuggestions(foodName);
  const results = _.concat(autoCompletions, generateAutoSuggestions(autoCompletions, suggestions, foodName), suggestions)
    .slice(0, 5);
  return callback(results);
}
