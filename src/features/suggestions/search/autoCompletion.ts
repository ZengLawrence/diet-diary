import _ from 'lodash';
import parseAmount, { DecomposedAmount } from '../parser/DecomposedAmount';
import { createSuggestion, Suggestion } from '../Suggestion';
import autoCompleteUnit from './unitMiniSearch';
import { DecomposedFoodDescription } from '../parser/DecomposedFoodDescription';
import { findNameSuggestions } from './foodNameSearch';

export default function findAutoCompletions(foodDescription: DecomposedFoodDescription): Suggestion[] {
  const { foodName, amount, foodNameCompleted, unitCompleted } = foodDescription;
  if (foodNameCompleted) {
    if (amount && !unitCompleted) {
      const suggestionWithAmount = _.partial(createSuggestion, foodName);
      const amountAutoCompletions = findAmountAutoCompletions(parseAmount(amount))
        .map(suggestionWithAmount);
      if (_.size(amountAutoCompletions) > 0) {
        return amountAutoCompletions;
      }
    }
    return [createSuggestion(foodName, amount)];
  }
  return findNameSuggestions(foodName);
}

function findAmountAutoCompletions(amount: DecomposedAmount) {
  const { measurement } = amount;
  const { unit, unitText, amountWithUnitText } = measurement;

  if (unit === "unknown" && unitText) {
    return _.map(autoCompleteUnit(unitText))
      .slice(0, 2)
      .map(amountWithUnitText);
  } else {
    return [];
  }
}
