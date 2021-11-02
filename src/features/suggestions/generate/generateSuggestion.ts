import _ from 'lodash';
import { unitOf } from '../parser/amount';
import decompose from '../parser/DecomposedFoodDescription';
import findAutoCompletions from '../search/autoCompletion';
import { findSuggestions } from '../search/foodNameSearch';
import { Suggestion } from '../Suggestion';
import { generateAutoSuggestion } from './autoSuggestion';

export function generateSuggestions(
  foodDescriptionRef: React.MutableRefObject<String>,
  callback: (suggestions: Suggestion[]) => void
) {
  const foodDescription = decompose(foodDescriptionRef.current + "");
  const autoCompletions = findAutoCompletions(foodDescription);

  const firstAutoCompletion = autoCompletions[0];
  const servingSuggestions = findSuggestions(foodDescription.foodName, {convertibleFrom: unitOf(firstAutoCompletion.amount)});
  const allSuggestions = _.concat(autoCompletions, generateAutoSuggestion(firstAutoCompletion, servingSuggestions), servingSuggestions);
  const results = _.uniqWith(_.compact(allSuggestions), _.isEqual)
    .slice(0, 5);
  return callback(results);
}
