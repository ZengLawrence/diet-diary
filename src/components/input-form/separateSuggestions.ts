import _ from "lodash";
import { PortionSuggestion, ServingSuggestion } from "../../features/suggestions";
import { Selectable } from "../../model/Selectable";

function isServingSuggestion(suggestion: (ServingSuggestion | PortionSuggestion)) : suggestion is ServingSuggestion {
  return "servingSize" in suggestion;
}

function isPortionSuggestion(suggestion: (ServingSuggestion | PortionSuggestion)) : suggestion is PortionSuggestion {
  return "portionSize" in suggestion;
}

export function separateSuggestions(suggestions: ((ServingSuggestion | PortionSuggestion) & Selectable)[]) {
  return { 
    servingSuggestions: _.filter(suggestions, isServingSuggestion) as (ServingSuggestion & Selectable)[],
    portionSuggestions: _.filter(suggestions, isPortionSuggestion) as (PortionSuggestion & Selectable)[],
  };
}
