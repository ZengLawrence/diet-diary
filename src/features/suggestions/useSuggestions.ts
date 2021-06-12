import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { ServingSuggestion } from "./ServingSuggestion";
import { servings as portionSuggestions } from "./portion/portion-serving.json";
import { generateServingSuggestions } from "./generateServingSuggestions";

const debouncedGenerateSuggestions = _.debounce(generateServingSuggestions, 500, { maxWait: 2000 });

export const useSuggestions = (initialDescription: string) => {
  const [servingSuggestions, setServingSuggestions] = useState([] as ServingSuggestion[]);
  const descRef = useRef(initialDescription);

  const generateSuggestions = (desc: string) => {
    descRef.current = desc;
    debouncedGenerateSuggestions(descRef, setServingSuggestions);
  }

  // initialize suggestions
  useEffect(() => {
    generateServingSuggestions(descRef, setServingSuggestions);
  }, [descRef, setServingSuggestions])
  
  return {
    servingSuggestions,
    portionSuggestions,
    generateSuggestions
  };
}