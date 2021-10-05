import { foodName } from "../parser/foodName";
import { searchFoodPortionSize } from "./search";
import { PortionSuggestion } from "./PortionSuggestion";

function findPortionSuggestions(foodDescription: string) {
  return searchFoodPortionSize(foodName(foodDescription));
}

export const generatePortionSuggestions = (descRef: React.MutableRefObject<String>, callback: (suggestions: PortionSuggestion[]) => void) =>
  callback(findPortionSuggestions(descRef.current + ""));
