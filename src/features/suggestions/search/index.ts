import _ from 'lodash';
import { foodName } from '../parser/foodName';
import { PortionSuggestion } from '../portion/PortionSuggestion';
import { ServingSuggestion } from '../serving/ServingSuggestion';
import { searchFoodServingPortionSize } from './search';

export type Suggestion = ServingSuggestion | PortionSuggestion;

export function isServingSuggestion(suggestion: Suggestion): suggestion is ServingSuggestion {
  return "servingSize" in suggestion;
}

function findSuggestions(foodDescription: string) {
  const results = searchFoodServingPortionSize(foodName(foodDescription));
  return _.slice(results, 0, 5);
}

export function generateSuggestions(
  descRef: React.MutableRefObject<String>,
  callback: (suggestions: Suggestion[]) => void
) {
  return callback(findSuggestions(descRef.current + ""));
}
