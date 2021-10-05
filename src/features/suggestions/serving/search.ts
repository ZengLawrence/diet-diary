import _ from "lodash";
import servings from "./servings";
import { ServingSuggestion } from "./ServingSuggestion";
import { buildDocuments, search } from "../search/miniSearchEngine";

const suggestions = buildDocuments<ServingSuggestion>(servings);

export const searchFoodServingSize = (foodName: string) =>
  _.slice(search(suggestions, foodName), 0, 2);
