import _ from "lodash";
import portions from "../portion/portions";
import { PortionSuggestion } from "../portion/PortionSuggestion";
import { buildDocuments, search, autoSuggest } from "../search/miniSearchEngine";
import servings from "../serving/servings";
import { ServingSuggestion } from "../serving/ServingSuggestion";

const suggestions = buildDocuments<ServingSuggestion | PortionSuggestion>(_.concat(servings, portions));

export const searchFoodServingPortionSize = (foodName: string) =>
  search(suggestions, foodName);

export const autoComplete = _.partial(autoSuggest, suggestions);
