import _ from 'lodash';
import { unitOf } from '../parser/amount';
import { Suggestion } from '../Suggestion';
import { isConvertible } from '../Unit';
import findAutoCompletions from '../search/autoCompletion';
import { generateAutoSuggestion } from './autoSuggestion';
import decompose from '../parser/DecomposedFoodDescription';
import { findSuggestions } from '../search/foodNameSearch';

function isUnitConvertible(autoCompletion: { amount?: string }, suggestion: { amount: string }) {
  return isConvertible(unitOf(autoCompletion.amount), unitOf(suggestion.amount))
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
