import _ from "lodash";
import { Serving } from "../../../model/Food";
import portions from "../portion/portions";
import { buildDocuments, search, autoSuggest } from "./foodNameMiniSearch";
import servings from "../serving/servings";
import parseAmount from "../parser/DecomposedAmount";
import { isMeasurementConvertible, Unit } from "../convert";

export interface PredefinedSuggestion {
  foodName: string;
  amount: string;
  serving: Serving;
  bestChoice?: boolean;
}

const suggestions = buildDocuments<PredefinedSuggestion>(_.concat(servings, portions));

const searchFoodServingPortionSize = (foodName: string) =>
  search(suggestions, foodName);

const autoComplete = _.partial(autoSuggest, suggestions);

function foodNameStartsWith(suggestion: { foodName: string }, foodName: string) {
  return _.startsWith(_.lowerCase(suggestion.foodName), _.lowerCase(foodName));
}

function minTermDistance(suggestion: PredefinedSuggestion, terms: string[]) {
  const distances = _.map(_.map(terms, _.lowerCase), function (term) {
    const pos = _.lowerCase(suggestion.foodName).indexOf(term);
    const notFound = pos < 0;
    return notFound ? Number.MAX_SAFE_INTEGER : pos;
  });
  return _.head(_.sortBy(distances));
}

function matchedWordCount(suggestion: PredefinedSuggestion, terms: string[]) {
  const words = _.words(_.lowerCase(suggestion.foodName));
  return _.sum(_.map(_.map(terms, _.lowerCase), word => words.includes(word) ? 1 : 0));
}

function rank(suggestion: PredefinedSuggestion, searchRank: number, foodName: string) {
  const prefixRank = foodNameStartsWith(suggestion, foodName) ? 0 : 1;
  const termDistanceRank = minTermDistance(suggestion, _.words(foodName));
  const matchedWordRank = _.size(_.words(foodName)) - matchedWordCount(suggestion, _.words(foodName));
  return {
    suggestion,
    prefixRank,
    matchedWordRank,
    termDistanceRank,
    searchRank,
  }
}

function measurementsOf(suggestion: { amount: string }) {
  const { measurement, alternateMeasurement } = parseAmount(suggestion.amount);
  return alternateMeasurement ? [measurement, alternateMeasurement] : [measurement];
}

function isSuggestionConvertible(suggestion: { amount: string }, fromUnit: Unit | undefined) {
  // incomplete input, assume convertible
  if (_.isUndefined(fromUnit)) return true;

  const isAnyMeasurementConvertibleFromUnit = (result: boolean, measurement: { unit: Unit }) => {
    return result || isMeasurementConvertible(fromUnit, measurement);
  }
  return _.reduce(measurementsOf(suggestion), isAnyMeasurementConvertibleFromUnit, false);
}

export function findSuggestions(foodName: string, options?: { convertibleFrom?: Unit }) {
  const isSuggestionConvertibleFromUnit = _.partial(isSuggestionConvertible, _, options?.convertibleFrom);
  const results = _.slice(searchFoodServingPortionSize(foodName), 0, 5)
    .filter(isSuggestionConvertibleFromUnit);
  const ranked = _.sortBy(_.map(results, _.partial(rank, _, _, foodName)),
    [
      'prefixRank',
      'matchedWordRank',
      'termDistanceRank',
      'searchRank',
    ]
  );
  return _.map(ranked, 'suggestion');
}

export function findNameSuggestions(foodName: string) {
  const shouldCapitalized = (foodName === _.capitalize(foodName));
  const format = (s: string) => shouldCapitalized ? _.capitalize(s) : s;
  const results = autoComplete(foodName)
    .map(format)
    .map(foodName => ({ foodName }))
  return _.size(results) === 0 ? [{ foodName }] : _.slice(results, 0, 5);
}