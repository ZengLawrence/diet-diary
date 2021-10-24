import _ from "lodash";
import portions from "../portion/portions";
import { buildDocuments, search, autoSuggest } from "../search/miniSearchEngine";
import servings from "../serving/servings";

const suggestions = buildDocuments(_.concat(servings, portions));

const searchFoodServingPortionSize = (foodName: string) =>
  search(suggestions, foodName);

const autoComplete = _.partial(autoSuggest, suggestions);

export function findSuggestions(foodName: string) {
  const results = searchFoodServingPortionSize(foodName);
  return _.slice(results, 0, 5);
}

export function findNameSuggestions(foodName: string) {
  const shouldCapitalized = (foodName === _.capitalize(foodName));
  const format = (s: string) => shouldCapitalized ? _.capitalize(s) : s;
  const results = autoComplete(foodName)
    .map(format)
    .map(foodName => ({ foodName }));
  return _.size(results) === 0 ? [{ foodName }] : _.slice(results, 0, 5);
}