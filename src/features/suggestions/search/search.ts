import _ from "lodash";
import portions from "../portion/portions";
import { buildDocuments, search, autoSuggest } from "../search/miniSearchEngine";
import servings from "../serving/servings";

const suggestions = buildDocuments(_.concat(servings, portions));

export const searchFoodServingPortionSize = (foodName: string) =>
  search(suggestions, foodName);

export const autoComplete = _.partial(autoSuggest, suggestions);
