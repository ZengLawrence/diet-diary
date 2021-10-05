import _ from "lodash";
import { buildDocuments, search } from "../search/fuseSearchEngine";
import { scoreLessThan } from "../search/ScorePredicate";
import { PortionSuggestion } from "./PortionSuggestion";
import portions from "./portions";

const suggestions = buildDocuments<PortionSuggestion>(portions);

export const searchFoodPortionSize = (foodName: string) =>
  _.slice(_.map(search(suggestions, foodName, scoreLessThan(0.6)), "item"), 0, 2);
