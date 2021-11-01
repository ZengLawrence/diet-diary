import _ from 'lodash';
import parseAmount, { Amount, unitOf } from '../parser/amount';
import { createSuggestion, Suggestion } from '../Suggestion';
import { isConvertible } from '../Unit';
import autoCompleteUnit from './autoCompleteUnit';
import { generateAutoSuggestion } from './autoSuggestion';
import decompose, { DecomposedFoodDescription } from './DecomposedFoodDescription';
import { findNameSuggestions, findSuggestions, PredefinedSuggestion } from './search';

function findAutoCompletions(foodDescription: DecomposedFoodDescription): Suggestion[] {
  const { foodName, amount, foodNameCompleted, unitCompleted } = foodDescription;
  if (foodNameCompleted) {
    if (amount && !unitCompleted) {
      const suggestionWithAmount = _.partial(createSuggestion, foodName);
      const amountAutoCompletions = findAmountAutoCompletions(parseAmount(amount))
        .map(suggestionWithAmount);
      if (_.size(amountAutoCompletions) > 0) return amountAutoCompletions;
    }
    return [createSuggestion(foodName, amount)];
  }
  return findNameSuggestions(foodName);
}

function findAmountAutoCompletions(amount: Amount) {
  const { unit, unitText, amountWithUnitText } = amount;

  if (_.isUndefined(unit) && unitText) {
    return _.map(autoCompleteUnit(unitText))
      .slice(0, 2)
      .map(amountWithUnitText);
  } else {
    return [];
  }
}

function isUnitConvertible(autoCompletion: Suggestion, suggestion: PredefinedSuggestion) {
  return isConvertible(unitOf(autoCompletion.amount), parseAmount(suggestion.amount).unit)
}

export function generateSuggestions(
  foodDescriptionRef: React.MutableRefObject<String>,
  callback: (suggestions: Suggestion[]) => void
) {
  const foodDescription = decompose(foodDescriptionRef.current + "");
  const autoCompletions = findAutoCompletions(foodDescription);

  const firstAutoCompletion = autoCompletions[0];
  const isUnitConvertibleFromAutoCompletion = _.partial(isUnitConvertible, firstAutoCompletion);
  const servingSuggestions = _.filter(findSuggestions(foodDescription.foodName), isUnitConvertibleFromAutoCompletion);
  const allSuggestions = _.concat(autoCompletions, generateAutoSuggestion(firstAutoCompletion, servingSuggestions), servingSuggestions);
  const results = _.uniqWith(_.compact(allSuggestions), _.isEqual)
    .slice(0, 5);
  return callback(results);
}
