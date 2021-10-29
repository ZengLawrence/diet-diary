import _ from 'lodash';
import { Suggestion } from "../Suggestion";
import baseOn from './calculateServing';
import { PredefinedSuggestion } from './search';

function shouldGenerateAutoSuggestion(autoCompletions: Suggestion[], suggestions: PredefinedSuggestion[]) {
  return _.size(autoCompletions) === 1
    && _.size(suggestions) > 0;
}

export function generateAutoSuggestion(autoCompletions: Suggestion[], suggestions: PredefinedSuggestion[]) {
  if (!shouldGenerateAutoSuggestion(autoCompletions, suggestions)) return null;

  return createAutoSuggestion(autoCompletions[0], suggestions[0]);
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
