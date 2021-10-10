import _ from "lodash";
import { PortionSuggestion, ServingSuggestion } from "../../features/suggestions";
import { Selectable } from "../../model/Selectable";

function separate(
  result: { 
    servingSuggestions: (ServingSuggestion & Selectable)[]; 
    portionSuggestions: (PortionSuggestion & Selectable)[]; 
  }, 
  suggestion: ((ServingSuggestion | PortionSuggestion) & Selectable)) {
  if ("servingSize" in suggestion) {
    return {
      ...result,
      servingSuggestions: [...result.servingSuggestions, suggestion as (ServingSuggestion & Selectable)]
    };
  } else {
    return {
      ...result,
      portionSuggestions: [...result.portionSuggestions, suggestion as (PortionSuggestion & Selectable)]
    };
  }
}

export function separateSuggestions(suggestions: ((ServingSuggestion | PortionSuggestion) & Selectable)[]) {
  return _.reduce(suggestions, separate, { servingSuggestions: [], portionSuggestions: [] });
}
