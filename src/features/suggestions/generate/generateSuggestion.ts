import _ from 'lodash';
import parseAmount from '../parser/DecomposedAmount';
import decompose from '../parser/DecomposedFoodDescription';
import findAutoCompletions from '../search/autoCompletion';
import { findSuggestions } from '../search/foodNameSearch';
import { Suggestion } from '../Suggestion';
import { generateAutoSuggestion } from './autoSuggestion';
import { isAmountParsable } from './isAmountParsable';

function unitOfMeasurement(amount?: string) {
  if (amount && isAmountParsable(amount)) {
    const { measurement } = parseAmount(amount);
    return measurement.unit;
  }
  return undefined;
}

export function generateSuggestions(
  foodDescriptionRef: React.RefObject<string>,
  callback: (suggestions: Suggestion[]) => void
) {
  const foodDescription = decompose(foodDescriptionRef.current + "");
  const autoCompletions = findAutoCompletions(foodDescription);

  const firstAutoCompletion = autoCompletions[0];
  const servingSuggestions = findSuggestions(foodDescription.foodName, { convertibleFrom: unitOfMeasurement(firstAutoCompletion.amount) });
  const autoSuggestions = generateAutoSuggestion(firstAutoCompletion, servingSuggestions);
  const allSuggestions = _.concat(autoCompletions, autoSuggestions, servingSuggestions);
  const results = _.uniqWith(_.compact(allSuggestions), _.isEqual)
    .slice(0, 5);
  return callback(results);
}
