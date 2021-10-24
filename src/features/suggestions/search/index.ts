import _ from 'lodash';
import { parseFoodDescription } from '../parser/foodDescription';
import { generateAutoSuggestions, shouldGenerateAutoSuggestion } from './autoSuggestion';
import { findNameSuggestions, findSuggestions } from './search';
import { createSuggestion, Suggestion } from '../Suggestion';

function decompose(foodDescription: string) {
  const { foodName, amount } = parseFoodDescription(foodDescription);
  // put a space after a word
  const foodNameCompleted = foodDescription.substr(_.size(foodName), 1) === " ";
  return {
    foodName,
    amount,
    foodNameCompleted,
  }
}

export function generateSuggestions(
  foodDescriptionRef: React.MutableRefObject<String>,
  callback: (suggestions: Suggestion[]) => void
) {
  const { foodName, amount, foodNameCompleted } = decompose(foodDescriptionRef.current + "");
  const autoCompletions: Suggestion[] = foodNameCompleted ? [createSuggestion(foodName, amount)] : findNameSuggestions(foodName);

  const suggestions = findSuggestions(foodName);
  const shouldGenerate = shouldGenerateAutoSuggestion(autoCompletions, suggestions, foodName);
  const autoSuggestions = shouldGenerate ? generateAutoSuggestions(autoCompletions, suggestions) : [];
  const results = _.concat(autoCompletions, autoSuggestions, suggestions)
    .slice(0, 5);
  return callback(results);
}
