import _ from "lodash";
import { fuzzySearch, scoreLessThan, search } from "../fuzzySearch";
import { PortionSuggestion } from "./PortionSuggestion";
import portions from "./portions";

const suggestions = fuzzySearch<PortionSuggestion>(portions);

export const searchFoodPortionSize = (foodName: string) =>
  _.slice(_.map(search(suggestions, foodName, scoreLessThan(0.6)), "item"), 0, 2);
