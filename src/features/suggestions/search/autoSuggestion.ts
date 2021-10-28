import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import { parseAmount } from '../parser/amount';
import { Suggestion } from "../Suggestion";
import { PredefinedSuggestion } from './search';
import convert, { Unit } from 'convert-units';

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

function normalize(unitStr: string): Unit | undefined {
  if (unitStr === 'lb' ||
    unitStr === 'oz') {
    return unitStr;
  } else {
    return undefined;
  }
}

function calculateServing(unitServing: Serving, unitAmount: string, amount: string) {
  const to = parseAmount(amount);
  const unitQuantity = parseAmount(unitAmount);
  const toUnit = normalize(to.unit);
  const unit = normalize(unitQuantity.unit);
  const normalizedQuantity = (toUnit && unit) ? convert(to.quantity).from(toUnit).to(unit) : to.quantity;
  return multiply(unitServing, _.round(normalizedQuantity / unitQuantity.quantity, 3));
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
