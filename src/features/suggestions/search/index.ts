import _ from 'lodash';
import { foodName } from '../parser/foodName';
import { PortionSuggestion } from '../portion/PortionSuggestion';
import { ServingSuggestion } from '../serving/ServingSuggestion';
import { searchFoodServingPortionSize } from './search';

export type Suggestion = string | ServingSuggestion | PortionSuggestion;

export function isServingSuggestion(suggestion: Suggestion): suggestion is ServingSuggestion {
  return typeof suggestion === "object" && "servingSize" in suggestion;
}

export function isPortionSuggestion(suggestion: Suggestion) : suggestion is PortionSuggestion {
  return typeof suggestion === "object" && "portionSize" in suggestion;
}

function findSuggestions(foodDescription: string) {
  const results = searchFoodServingPortionSize(foodName(foodDescription));
  return _.slice(results, 0, 5);
}

export function generateSuggestions(
  descRef: React.MutableRefObject<String>,
  callback: (suggestions: Suggestion[]) => void
) {
  const foodDescription = descRef.current + "";
  const autoCompletions : Suggestion[] = [foodDescription];
  return callback(_.concat(autoCompletions, findSuggestions(foodDescription)));
}
