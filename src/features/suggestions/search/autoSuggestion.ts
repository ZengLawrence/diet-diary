import _ from 'lodash';
import { Suggestion } from "../Suggestion";
import { PredefinedSuggestion } from './search';
import calculateServing from './calculateServing';

function shouldGenerateAutoSuggestion(autoCompletions: Suggestion[], suggestions: PredefinedSuggestion[]) {
  return _.size(autoCompletions) === 1
    && _.size(suggestions) > 0;
}

function foodNameStartsWith(suggestion: PredefinedSuggestion, foodName: string) {
  return _.startsWith(_.lowerCase(suggestion.foodName), _.lowerCase(foodName));
}

export function generateAutoSuggestion(autoCompletions: Suggestion[], suggestions: PredefinedSuggestion[]) {
  if (!shouldGenerateAutoSuggestion(autoCompletions, suggestions)) return null;

  const firstAutoCompletion = autoCompletions[0];
  const bestMatched = _.head(_.filter(suggestions, suggestion => foodNameStartsWith(suggestion, firstAutoCompletion.foodName)))
    || suggestions[0];
  return createAutoSuggestion(firstAutoCompletion, bestMatched);
}

function createAutoSuggestion(nameSuggestion: Suggestion, suggestion: PredefinedSuggestion) {
  const { foodName, amount } = nameSuggestion;
  const autoSuggestion = {
    ...suggestion,
    foodName
  };
  if (amount) {
    if (_.startsWith(suggestion.amount, amount)) {
      return autoSuggestion;
    } else {
      const serving = calculateServing(suggestion.serving, suggestion.amount, amount);
      return {
        ...autoSuggestion,
        amount,
        serving,
      }
    }
  }

  return autoSuggestion;
}
