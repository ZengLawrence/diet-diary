import _ from "lodash";
import { useRef } from "react";
import { generatePortionSuggestions, generateServingSuggestions } from "./generateServingSuggestions";
import { PortionSuggestion } from "./PortionSuggestion";
import { ServingSuggestion } from "./ServingSuggestion";

const debouncedGenerateServingSuggestions = _.debounce(generateServingSuggestions, 500, { maxWait: 2000 });
const debouncedGeneratePortionSuggestions = _.debounce(generatePortionSuggestions, 500, { maxWait: 2000 });

export const useGenerateSuggestions = (
  initialDescription: string,
  setServingSuggestions: (servingSuggestions: ServingSuggestion[]) => void,
  setPortionSuggestions: (portionSuggestions: PortionSuggestion[]) => void
) => {

  const descRef = useRef(initialDescription);

  const generateSuggestions = (desc: string) => {
    descRef.current = desc;
    debouncedGenerateServingSuggestions(descRef, setServingSuggestions);
    debouncedGeneratePortionSuggestions(descRef, setPortionSuggestions);
  }

  // initialize suggestions
/*   useEffect(() => {
    generateServingSuggestions(descRef, setServingSuggestions);
    generatePortionSuggestions(descRef, setPortionSuggestions);
  }, [descRef, setServingSuggestions, setPortionSuggestions])
 */
  return generateSuggestions;
}