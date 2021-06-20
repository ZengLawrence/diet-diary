import { createAction, createReducer } from "@reduxjs/toolkit";
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

const initialState: State = {
  servingSuggestions: [],
  portionSuggestions: [],
}

const setServingSuggestionsAction = createAction<ServingSuggestion[]>("setServingSuggestions");
const setPortionSuggestionsAction = createAction<PortionSuggestion[]>("portionSuggestions");

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setServingSuggestionsAction, (state, action) => {
      state.servingSuggestions = action.payload;
    })
    .addCase(setPortionSuggestionsAction, (state, action) => {
      state.portionSuggestions = action.payload;
    })
});

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