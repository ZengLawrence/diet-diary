import _ from 'lodash';
import { Suggestion } from "../Suggestion";
import baseOn from './calculateServing';
import { PredefinedSuggestion } from "../search/PredefinedSuggestion";

export function generateAutoSuggestion(autoCompletion: Suggestion, suggestions: PredefinedSuggestion[]) {
  if (_.size(suggestions) === 0) return null;

  const bestMatch = suggestions[0];
  return createAutoSuggestion(autoCompletion, bestMatch);
}

/**
 * Amount string is parsable if it has matching parentheses. Default to true if there is no parentheses.
 * 
 * @param amount Amount string to check if it is parsable
 * @returns true if amount is parsable, false otherwise
 */
function isAmountParsable(amount: string) {
  if (_.endsWith(amount, ")")) {
    return amount.includes("(");
  }
  return !amount.includes("(");
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
