import _ from 'lodash';
import type { Suggestion } from "../Suggestion";
import baseOn from './calculateServing';
import type { PredefinedSuggestion } from "../search/PredefinedSuggestion";
import { isAmountParsable } from './isAmountParsable';

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
  if (amount && isAmountParsable(amount)) {
    const serving = baseOn(suggestion).servingFor(amount);
    return {
      ...autoSuggestion,
      amount,
      serving,
    }
  }

  return autoSuggestion;
}
