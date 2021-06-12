import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { ServingSuggestion } from "./ServingSuggestion";
import { generatePortionSuggestions, generateServingSuggestions } from "./generateServingSuggestions";
import { PortionSuggestion } from "./PortionSuggestion";

const debouncedGenerateServingSuggestions = _.debounce(generateServingSuggestions, 500, { maxWait: 2000 });

const debouncedGeneratePortionSuggestions = _.debounce(generatePortionSuggestions, 500, { maxWait: 2000 });

export const useSuggestions = (initialDescription: string) => {
  const [servingSuggestions, setServingSuggestions] = useState([] as ServingSuggestion[]);
  const [portionSuggestions, setPortionSuggestions] = useState([] as PortionSuggestion[]);
  const descRef = useRef(initialDescription);

  const generateSuggestions = (desc: string) => {
    descRef.current = desc;
    debouncedGenerateServingSuggestions(descRef, setServingSuggestions);
    debouncedGeneratePortionSuggestions(descRef, setPortionSuggestions);
  }

  // initialize suggestions
  useEffect(() => {
    generateServingSuggestions(descRef, setServingSuggestions);
    generatePortionSuggestions(descRef, setPortionSuggestions);
  }, [descRef, setServingSuggestions])
  
  return {
    servingSuggestions,
    portionSuggestions,
    generateSuggestions
  };
}