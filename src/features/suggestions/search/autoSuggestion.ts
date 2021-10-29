import _ from 'lodash';
import { Suggestion } from "../Suggestion";
import baseOn from './calculateServing';
import { PredefinedSuggestion } from './search';

function shouldGenerateAutoSuggestion(autoCompletions: Suggestion[], suggestions: PredefinedSuggestion[]) {
  return _.size(autoCompletions) === 1
    && _.size(suggestions) > 0;
}

function foodNameStartsWith(suggestion: { foodName: string }, foodName: string) {
  return _.startsWith(_.lowerCase(suggestion.foodName), _.lowerCase(foodName));
}

function minTermDistance(suggestion: PredefinedSuggestion, terms: string[]) {
  return _.reduce(terms, function (result, term) {
    const distance = suggestion.foodName.indexOf(term);
    return distance > result.distance ? result : {
      ...result,
      distance,
    }
  },
    {
      suggestion,
      distance: Number.MAX_SAFE_INTEGER,
    })
}

function findBestMatch(foodName: string, suggestions: PredefinedSuggestion[]) {
  const prefixMatch = _.head(_.filter(suggestions, suggestion => foodNameStartsWith(suggestion, foodName)));
  const matchByShortestTermDistance = _.reduce(_.map(suggestions, suggestion => minTermDistance(suggestion, _.words(foodName))),
    function (result, suggestionWithDistance) {
      return suggestionWithDistance.distance < result.distance ? suggestionWithDistance : result;
    },
    {
      suggestion: undefined as unknown as PredefinedSuggestion,
      distance: Number.MAX_SAFE_INTEGER,
    }).suggestion;
  return prefixMatch
    || matchByShortestTermDistance
    || suggestions[0];
}

export function generateAutoSuggestion(autoCompletions: Suggestion[], suggestions: PredefinedSuggestion[]) {
  if (!shouldGenerateAutoSuggestion(autoCompletions, suggestions)) return null;

  const firstAutoCompletion = autoCompletions[0];
  const bestMatched = findBestMatch(firstAutoCompletion.foodName, suggestions);
  return createAutoSuggestion(firstAutoCompletion, bestMatched);
}

function createAutoSuggestion(nameSuggestion: Suggestion, suggestion: PredefinedSuggestion) {
  const { foodName, amount } = nameSuggestion;
  const autoSuggestion = {
    ...suggestion,
    foodName
  };
  if (amount) {
    if (_.startsWith(suggestion.amount, amount)) {
      return autoSuggestion;
    } else {
      const serving = baseOn(suggestion).servingFor(amount);
      return {
        ...autoSuggestion,
        amount,
        serving,
      }
    }
  }

  return autoSuggestion;
}
