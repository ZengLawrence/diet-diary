import { createAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useEffect, useReducer, useRef } from "react";
import { generatePortionSuggestions, generateServingSuggestions } from "./generateServingSuggestions";
import { PortionSuggestion } from "./PortionSuggestion";
import { ServingSuggestion } from "./ServingSuggestion";

const debouncedGenerateServingSuggestions = _.debounce(generateServingSuggestions, 500, { maxWait: 2000 });

const debouncedGeneratePortionSuggestions = _.debounce(generatePortionSuggestions, 500, { maxWait: 2000 });

interface State {
  servingSuggestions: ServingSuggestion[],
  portionSuggestions: PortionSuggestion[],
}

const setServingSuggestionsAction = createAction<ServingSuggestion[]>("setServingSuggestions");
type SetServingSuggestionsAction = ReturnType<typeof setServingSuggestionsAction>;

const setPortionSuggestionsAction = createAction<PortionSuggestion[]>("portionSuggestions");
type SetPortionSuggestionsAction = ReturnType<typeof setPortionSuggestionsAction>;

type Action = SetServingSuggestionsAction | SetPortionSuggestionsAction;

const initialState = {
  servingSuggestions: [],
  portionSuggestions: [],
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case _.toString(setServingSuggestionsAction):
      return { ...state, servingSuggestions: (action as SetServingSuggestionsAction).payload };
    case _.toString(setPortionSuggestionsAction):
      return { ...state, portionSuggestions: (action as SetPortionSuggestionsAction).payload };
    default:
      throw new Error();
  }
}

export const useSuggestions = (initialDescription: string): [State, (desc: string) => void] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setServingSuggestions = (servingSuggestions: ServingSuggestion[]) => dispatch(setServingSuggestionsAction(servingSuggestions));
  const setPortionSuggestions = (portionSuggestions: PortionSuggestion[]) => dispatch(setPortionSuggestionsAction(portionSuggestions));

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
  }, [descRef, dispatch])

  return [state, generateSuggestions];
}