import _ from "lodash";
import { PortionSuggestion, ServingSuggestion } from "../../features/suggestions";

function separate(result: { servingSuggestions: ServingSuggestion[]; portionSuggestions: PortionSuggestion[]; }, suggestion: ServingSuggestion | PortionSuggestion) {
  if ("servingSize" in suggestion) {
    return {
      ...result,
      servingSuggestions: [...result.servingSuggestions, suggestion as ServingSuggestion]
    };
  } else {
    return {
      ...result,
      portionSuggestions: [...result.portionSuggestions, suggestion as PortionSuggestion]
    };
  }
}

export function separateSuggestions(suggestions: (ServingSuggestion | PortionSuggestion)[]) {
  return _.reduce(suggestions, separate, { servingSuggestions: [], portionSuggestions: [] });
}
