import _ from "lodash";
import servings from "./servings";
import { ServingSuggestion } from "./ServingSuggestion";
import { buildDocuments, search } from "../search/fuseSearch";

const suggestions = buildDocuments<ServingSuggestion>(servings);

export const searchFoodServingSize = (foodName: string) =>
  _.map(_.slice(search(suggestions, foodName), 0, 2), "item");
