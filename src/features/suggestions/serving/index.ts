import _ from "lodash";
import { foodName } from "../parser/foodName";
import { searchFoodServingSize } from "./search";
import { ServingSuggestion } from "./ServingSuggestion";

export const generateServingSuggestions = (descRef: React.MutableRefObject<String>, callback: (suggestions: ServingSuggestion[]) => void) => callback(findServingSuggestions(descRef.current + ""));
function findServingSuggestions(foodDescription: string) {
  const results = searchFoodServingSize(foodName(foodDescription));
  return _.slice(results, 0, 3);
}
