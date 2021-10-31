import _ from 'lodash';
import { generateAutoSuggestion } from './autoSuggestion';
import { findNameSuggestions, findSuggestions } from './search';
import { createSuggestion, Suggestion } from '../Suggestion';
import autoCompleteUnit from './autoCompleteUnit';
import { Amount, parseAmount, unitOf } from '../parser/amount';
import isConvertible from './isConvertible';
import decompose, { DecomposedFoodDescription } from './DecomposedFoodDescription';

function findAutoCompletions(foodDescription: DecomposedFoodDescription) : Suggestion[] {
  const { foodName, amount, foodNameCompleted, unitCompleted } = foodDescription;
  if (foodNameCompleted) {
    if (amount && !unitCompleted) {
      const amountAutoCompletions = findAmountAutoCompletions(parseAmount(amount), foodName);
      if (_.size(amountAutoCompletions) > 0) return amountAutoCompletions;
    }
    return [createSuggestion(foodName, amount)];
  }
  return findNameSuggestions(foodName);
}

function findAmountAutoCompletions(amount: Amount, foodName: string) {
  const { unit, unitText, amountWithUnitText } = amount;

  const suggestionWithAmount = _.partial(createSuggestion, foodName);
  if (_.isUndefined(unit) && unitText) {
    return _.map(autoCompleteUnit(unitText))
      .slice(0, 2)
      .map(amountWithUnitText)
      .map(suggestionWithAmount);
  } else {
    return [];
  }
}

export function generateSuggestions(
  foodDescriptionRef: React.MutableRefObject<String>,
  callback: (suggestions: Suggestion[]) => void
) {
  const foodDescription = decompose(foodDescriptionRef.current + "");
  const autoCompletions = findAutoCompletions(foodDescription);

  const firstAutoCompletion = autoCompletions[0];
  const isConvertibleFromAutoCompletion = _.partial(isConvertible, unitOf(firstAutoCompletion.amount || ""));
  const suggestions = _.filter(findSuggestions(foodDescription.foodName), isConvertibleFromAutoCompletion);
  const results = _.compact(_.concat(autoCompletions, generateAutoSuggestion(firstAutoCompletion, suggestions), suggestions))
    .slice(0, 5);
  return callback(results);
}
