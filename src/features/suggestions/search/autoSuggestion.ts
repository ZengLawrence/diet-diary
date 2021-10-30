import _ from 'lodash';
import { Suggestion } from "../Suggestion";
import baseOn from './calculateServing';
import { PredefinedSuggestion } from './search';
import { Unit, parseAmount, unitOf, isMeasure, measureOf } from "../parser/amount";

function shouldGenerateAutoSuggestion(autoCompletions: Suggestion[], suggestions: PredefinedSuggestion[]) {
  return _.size(autoCompletions) === 1
    && _.size(suggestions) > 0;
}

function isConvertible(fromUnit: Unit, suggestion: PredefinedSuggestion) {
  const isConvertibleTo = _.partial(isMeasure, _, measureOf(fromUnit));
  const toUnit = parseAmount(suggestion.amount).unit;
  return isConvertibleTo(toUnit);
}

export function generateAutoSuggestion(autoCompletions: Suggestion[], suggestions: PredefinedSuggestion[]) {
  if (!shouldGenerateAutoSuggestion(autoCompletions, suggestions)) return null;

  const firstAutoCompletion = autoCompletions[0];

  const isConvertibleFromAutoCompletion = _.partial(isConvertible, unitOf(firstAutoCompletion.amount || ""));
  const bestMatch = _.head(_.filter(suggestions, isConvertibleFromAutoCompletion))
    || suggestions[0];
  return createAutoSuggestion(firstAutoCompletion, bestMatch);
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
