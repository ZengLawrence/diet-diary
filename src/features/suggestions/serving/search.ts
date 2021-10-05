import _ from "lodash";
import servings from "./servings";
import { ServingSuggestion } from "./ServingSuggestion";
import { fuzzySearch, search } from "../search/fuseSearch";

const suggestions = fuzzySearch<ServingSuggestion>(servings);

export const searchFoodServingSize = (foodName: string) =>
  _.map(_.slice(search(suggestions, foodName), 0, 2), "item");
