import _ from "lodash";
import { foodName } from "./parser/foodName";
import { searchFoodPortionSize } from "./portion/search";
import { PortionSuggestion } from "./PortionSuggestion";
import { searchFoodServingSize } from "./serving/search";
import { ServingSuggestion } from "./ServingSuggestion";

function findServingSuggestions(foodDescription: string) {
  const results = searchFoodServingSize(foodName(foodDescription));
  return _.slice(results, 0, 3);
}

export const generateServingSuggestions = (descRef: React.MutableRefObject<String>, callback: (suggestions: ServingSuggestion[]) => void) =>
  callback(findServingSuggestions(descRef.current + ""));

function findPortionSuggestions(foodDescription: string) {
  return searchFoodPortionSize(foodName(foodDescription));
}

export const generatePortionSuggestions = (descRef: React.MutableRefObject<String>, callback: (suggestions: PortionSuggestion[]) => void) =>
  callback(findPortionSuggestions(descRef.current + ""));
