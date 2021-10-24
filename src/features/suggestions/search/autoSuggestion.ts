import _ from 'lodash';
import { Suggestion } from "../Suggestion";

function shouldGenerateAutoSuggestion(autoCompletions: Suggestion[], suggestions: Suggestion[]) {
  return _.size(autoCompletions) === 1
    && _.size(suggestions) > 0
    && !(autoCompletions[0].foodName === suggestions[0].foodName);
}

function foodNameStartsWith(suggestion: Suggestion, foodName: string) {
  return _.startsWith(_.lowerCase(suggestion.foodName), _.lowerCase(foodName));
}

export function generateAutoSuggestion(autoCompletions: Suggestion[], suggestions: Suggestion[]) {
  if (!shouldGenerateAutoSuggestion(autoCompletions, suggestions)) return null;

  const firstAutoCompletion = autoCompletions[0];
  const bestMatched = _.head(_.filter(suggestions, suggestion => foodNameStartsWith(suggestion, firstAutoCompletion.foodName)))
    || suggestions[0];
  return createAutoSuggestion(firstAutoCompletion, bestMatched);
}

function createAutoSuggestion(nameSuggestion: Suggestion, suggestion: Suggestion) {
  const { foodName, amount } = nameSuggestion;
  const autoSuggestion = {
    ...suggestion,
    foodName
  };
  if (amount) {
    if (_.startsWith(suggestion.amount, amount)) {
      return autoSuggestion;
    } else {
      return {
        ...autoSuggestion,
        amount,
      }
    }
  }

  return autoSuggestion;
}