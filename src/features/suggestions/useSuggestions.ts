import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { searchFoodServingSize } from "./serving/search";
import { ServingSuggestion } from "./ServingSuggestion";
import { servings as portionSuggestions } from "./portion/portion-serving.json";

const ingredientName = (phrase: string) => _.map(_.split(phrase, /\d/, 1), _.trim);

const ingredients = (foodDescription: string) => _.flatMap(_.split(foodDescription, ","), ingredientName);

function findServingSuggestions(foodDescription: string) {
  const _ingredients = ingredients(foodDescription);
  const lastIngredient = (index: number) => (index === _.size(_ingredients) - 1);
  const maxItems = (items: any[], index: number) => _.slice(items, 0, lastIngredient(index) ? 5 : 2);

  const results = _.map(_ingredients, ingredient => searchFoodServingSize(ingredient));
  return _.uniq(_.flatMap(_.map(results, maxItems)));
}

const _generateSuggestions = (descRef: React.MutableRefObject<String>, callback: (suggestions: ServingSuggestion[]) => void) => 
  callback(findServingSuggestions(descRef.current + ""));

const debouncedGenerateSuggestions = _.debounce(_generateSuggestions, 500, { maxWait: 2000 });

export const useSuggestions = (initialDescription: string) => {
  const [servingSuggestions, setServingSuggestions] = useState([] as ServingSuggestion[]);
  const descRef = useRef(initialDescription);

  const generateSuggestions = (desc: string) => {
    descRef.current = desc;
    debouncedGenerateSuggestions(descRef, setServingSuggestions);
  }

  // initialize suggestions
  useEffect(() => {
    _generateSuggestions(descRef, setServingSuggestions);
  }, [descRef, setServingSuggestions])
  
  return {
    servingSuggestions,
    portionSuggestions,
    generateSuggestions
  };
}