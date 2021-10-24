import _ from 'lodash';
import { Suggestion } from "../Suggestion";

export function shouldGenerateAutoSuggestion(autoCompletions: Suggestion[], suggestions: Suggestion[], foodName: string) {
  return _.size(autoCompletions) === 1
    && _.size(suggestions) > 0
    && !(foodName === suggestions[0].foodName);
}

export function startsWith(suggestion: Suggestion, foodName: string) {
  return _.startsWith(_.lowerCase(suggestion.foodName), _.lowerCase(foodName));
}

export function generateAutoSuggestions(autoCompletions: Suggestion[], suggestions: Suggestion[]) {
  const firstAutoCompletion = autoCompletions[0];
  const startsWithAutoCompletedFoodName = (suggestion: Suggestion) => startsWith(suggestion, firstAutoCompletion.foodName);
  const bestMatched = _.head(_.filter(suggestions, startsWithAutoCompletedFoodName))
    || suggestions[0];
  return [createAutoSuggestion(firstAutoCompletion, bestMatched)];
}

function createAutoSuggestion(nameSuggestion: Suggestion, suggestion: Suggestion) {
  return {
    ...suggestion,
    ...nameSuggestion
  };
}
