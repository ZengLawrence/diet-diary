import _ from 'lodash';
import { parseFoodDescription } from '../parser/foodDescription';
import { autoComplete, searchFoodServingPortionSize } from './search';
import { shouldGenerateAutoSuggestion, generateAutoSuggestions } from './autoSuggestion';
import { Suggestion } from './Suggestion';

function findSuggestions(foodName: string) {
  const results = searchFoodServingPortionSize(foodName);
  return _.slice(results, 0, 5);
}

function findNameSuggestions(foodName: string) {
  const shouldCapitalized = (foodName === _.capitalize(foodName));
  const format = (s: string) => shouldCapitalized ? _.capitalize(s) : s;
  const results = autoComplete(foodName)
    .map(format)
    .map(foodName => ({ foodName }));
  return _.size(results) === 0 ? [{ foodName }] : _.slice(results, 0, 5);
}

export function startsWith(suggestion: Suggestion, foodName: string) {
  return _.startsWith(_.lowerCase(suggestion.foodName), _.lowerCase(foodName));
}

function createAutoCompletion(foodName: string, amount?: string) {
  return amount ? { foodName, amount } : { foodName };
}

function decompose(foodDescription: string) {
  const { foodName, amount } = parseFoodDescription(foodDescription) as
    {
      foodName: string,
      amount?: string
    };
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
  const autoCompletions: Suggestion[] = foodNameCompleted ? [createAutoCompletion(foodName, amount)] : findNameSuggestions(foodName);

  const suggestions = findSuggestions(foodName);
  const shouldGenerate = shouldGenerateAutoSuggestion(autoCompletions, suggestions, foodName);
  const autoSuggestions = shouldGenerate ? generateAutoSuggestions(autoCompletions, suggestions) : [];
  const results = _.concat(autoCompletions, autoSuggestions, suggestions)
    .slice(0, 5);
  return callback(results);
}
