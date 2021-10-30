import _ from 'lodash';
import { parseFoodDescription } from '../parser/foodDescription';
import { generateAutoSuggestion } from './autoSuggestion';
import { findNameSuggestions, findSuggestions } from './search';
import { createSuggestion, Suggestion } from '../Suggestion';
import autoCompleteAmount from './autoCompleteAmount';
import { Amount, parseAmount } from '../parser/amount';

function decompose(foodDescription: string) {
  const { foodName, amount } = parseFoodDescription(foodDescription);
  // put a space after a word
  const foodNameCompleted = foodDescription.substr(_.size(foodName), 1) === " ";
  const unitCompleted = amount ? foodDescription.substr(_.size(foodDescription) - 1, 1) === " " : false;
  return {
    foodName,
    amount,
    foodNameCompleted,
    unitCompleted,
  }
}

type DecomposedFoodDescription = ReturnType<typeof decompose>;

function composeAmount(quantity: number, unitText: string) {
  return "" + quantity + " " + unitText;
}

function findAutoCompletions(foodDescription: DecomposedFoodDescription) {
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

function findAmountAutoCompletions(decomposedAmount: Amount, foodName: string) {
  const { quantity, unit, unitText } = decomposedAmount;

  const amountWithQuantity = _.partial(composeAmount, quantity);
  const suggestionWithFoodName = _.partial(createSuggestion, foodName);
  if (_.isUndefined(unit) && unitText) {
    return _.map(autoCompleteAmount(unitText))
      .slice(0, 2)
      .map(amountWithQuantity)
      .map(suggestionWithFoodName);
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

  const suggestions = findSuggestions(foodDescription.foodName);
  const results = _.compact(_.concat(autoCompletions, generateAutoSuggestion(autoCompletions, suggestions), suggestions))
    .slice(0, 5);
  return callback(results);
}
