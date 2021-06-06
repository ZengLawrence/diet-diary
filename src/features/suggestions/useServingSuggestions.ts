import _ from "lodash";
import { useRef, useState } from "react";
import { searchFoodServingSize } from "./search";
import { ServingSuggestion } from "./ServingSuggestion";

const ingredientName = (phrase: string) => _.map(_.split(phrase, /\d/, 1), _.trim);

const ingredients = (foodDescription: string) => _.flatMap(_.split(foodDescription, ","), ingredientName);

function findFoodServingSuggestions(foodDescription: string) {
  const _ingredients = ingredients(foodDescription);
  const lastIngredient = (index: number) => (index === _.size(_ingredients) - 1);
  const maxItems = (items: any[], index: number) => _.slice(items, 0, lastIngredient(index) ? 5 : 2);

  const results = _.map(_ingredients, ingredient => searchFoodServingSize(ingredient));
  return _.uniq(_.flatMap(_.map(results, maxItems)));
}

const _generateSuggestions = (descRef: React.MutableRefObject<String>, callback: (suggestions: ServingSuggestion[]) => void) => 
  callback(findFoodServingSuggestions(descRef.current + ""));

const debouncedGenerateSuggestions = _.debounce(_generateSuggestions, 500, { maxWait: 2000 });

export const useServingSuggestions = () => {
  const [suggestions, setSuggestions] = useState([] as ServingSuggestion[]);
  const descRef = useRef("");

  const generateSuggestions = (desc: string) => {
    descRef.current = desc;
    debouncedGenerateSuggestions(descRef, setSuggestions);
  }
  const resetSuggestions = () => {
    descRef.current = "";
    setSuggestions([]);
  }

  return {
    suggestions,
    generateSuggestions,
    resetSuggestions
  };
}