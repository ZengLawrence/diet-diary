import _ from 'lodash';
import { Suggestion } from "../Suggestion";
import baseOn from './calculateServing';
import { PredefinedSuggestion } from './search';

export function generateAutoSuggestion(autoCompletion: Suggestion, suggestions: PredefinedSuggestion[]) {
  if (_.size(suggestions) === 0) return null;

  const bestMatch = suggestions[0];
  return createAutoSuggestion(autoCompletion, bestMatch);
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
      const serving = baseOn(suggestion).servingFor(amount);
      return {
        ...autoSuggestion,
        amount,
        serving,
      }
    }
  }

  return autoSuggestion;
}
