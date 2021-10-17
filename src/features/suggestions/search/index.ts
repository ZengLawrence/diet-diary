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

function shouldGenerateAutoSuggestion(autoCompletions: Suggestion[], suggestions: Suggestion[], foodName: string) {
  return _.size(autoCompletions) === 1
    && _.size(suggestions) > 0
    && !(foodName === suggestions[0].foodName);
}

function generateAutoSuggestions(autoCompletions: Suggestion[], suggestions: Suggestion[]) {
  const bestMatched = _.head(suggestions.filter(suggestion => suggestion.foodName.toLowerCase().startsWith(autoCompletions[0].foodName.toLowerCase())));
  return [createAutoSuggestion(autoCompletions[0], bestMatched || suggestions[0])];
}

function createAutoCompletion(foodName: string, amount?: string) {
  return amount ? { foodName, amount } : { foodName };
}

function decompose(foodDescription: string) {
  const { foodName, amount } = parseFoodDescription(foodDescription) as
    {
      foodName: string,
      amount?: string
    };
  // put a space after a word
  const foodNameCompleted = foodDescription.substr(_.size(foodName), 1) === " ";
  return {
    foodName,
    amount,
    foodNameCompleted,
  }
}

export function generateSuggestions(
  foodDescriptionRef: React.MutableRefObject<String>,
  callback: (suggestions: Suggestion[]) => void
) {
  const { foodName, amount, foodNameCompleted } = decompose(foodDescriptionRef.current + "");
  const autoCompletions: Suggestion[] = foodNameCompleted ? [createAutoCompletion(foodName, amount)] : findNameSuggestions(foodName);

  const suggestions = findSuggestions(foodName);
  const shouldGenerate = shouldGenerateAutoSuggestion(autoCompletions, suggestions, foodName);
  const autoSuggestions = shouldGenerate ? generateAutoSuggestions(autoCompletions, suggestions) : [];
  const results = _.concat(autoCompletions, autoSuggestions, suggestions)
    .slice(0, 5);
  return callback(results);
}
