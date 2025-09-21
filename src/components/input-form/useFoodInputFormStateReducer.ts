import { Action, combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useEffect, useReducer, useRef } from "react";
import { generateSuggestions, Suggestion } from "../../features/suggestions";
import { Food, FoodGroup, hasMoreThanOneFoodGroup, Serving } from "../../model/Food";

interface ValidationError {
  foodDescription?: boolean;
  vegetable?: boolean;
  fruit?: boolean;
  carbohydrate?: boolean;
  proteinDiary?: boolean;
  fat?: boolean;
  sweet?: boolean;
  bestChoice?: boolean;
}

const suggestions = createSlice({
  name: "suggestions",
  initialState: [] as Suggestion[],
  reducers: {
    setSuggestions: (_state, action: PayloadAction<Suggestion[]>) => {
      return action.payload;
    },
  }
})
const {
  setSuggestions,
} = suggestions.actions;

const food = createSlice({
  name: "food",
  initialState: { description: "", serving: {}, bestChoice: false } as Food,
  reducers: {
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setServing(state, action: PayloadAction<Serving>) {
      state.serving = action.payload;
    },
    setFoodGroupServing(state, action: PayloadAction<{ foodGroup: FoodGroup; serving: number }>) {
      _.set(state.serving, action.payload.foodGroup, action.payload.serving)
    },
    unsetFoodGroupServing(state, action: PayloadAction<FoodGroup>) {
      _.unset(state.serving, action.payload)
    },
    setBestChoice(state, action: PayloadAction<boolean>) {
      state.bestChoice = action.payload;
    },
    toggleBestChoice(state) {
      state.bestChoice = !_.defaultTo(state.bestChoice, false);
    }
  },
})
const {
  setDescription,
  setServing,
  setFoodGroupServing, unsetFoodGroupServing,
  setBestChoice, toggleBestChoice
} = food.actions;

const error = createSlice({
  name: "error",
  initialState: {} as ValidationError,
  reducers: {
    validationFailed: (state, action) => _.assign(state, action.payload),
  },
  extraReducers: builder => {
    builder
      .addCase(setDescription, (state, action) => {
        state.foodDescription = _.isEmpty(action.payload);
      })
      .addCase(setFoodGroupServing, (state, action) => {
        state[action.payload.foodGroup] = lessThanZero(action.payload.serving);
      })
      .addCase(unsetFoodGroupServing, (state, action) => {
        state[action.payload] = false;
      })
      .addCase(toggleBestChoice, (state) => {
        state.bestChoice = false;
      })
  }
})
const { validationFailed } = error.actions;

const expand = createSlice({
  name: "expand",
  initialState: false,
  reducers: {
    setExpand: (_state, action: PayloadAction<boolean>) => action.payload,
  }
})
const { setExpand } = expand.actions;

const reducer = combineReducers({
  food: food.reducer,
  error: error.reducer,
  suggestions: suggestions.reducer,
  expand: expand.reducer,
})

function initialState(food: Food) {
  return {
    food,
    error: {},
    suggestions: [],
    expand: false,
  };
}

function lessThanZero(val?: number) { return (_.toNumber(val) < 0); }

function validateFood(food: Food): ValidationError {
  const { description, serving } = food;
  return {
    foodDescription: _.isEmpty(description),
    vegetable: lessThanZero(serving.vegetable),
    fruit: lessThanZero(serving.fruit),
    carbohydrate: lessThanZero(serving.carbohydrate),
    proteinDiary: lessThanZero(serving.proteinDiary),
    fat: lessThanZero(serving.fat),
    sweet: lessThanZero(serving.sweet),
    bestChoice: food.bestChoice ? (hasMoreThanOneFoodGroup(serving) || _.defaultTo(serving.sweet, 0) > 0) : false,
  };
}

function checkValidity(error: ValidationError) {
  const or = (res: boolean, val: boolean | undefined) => res || _.defaultTo(val, false);
  const failed = _.reduce(_.values(error), or, false);
  return !failed;
}

const debouncedGenerateSuggestions = _.debounce(generateSuggestions, 500, { maxWait: 2000 });

const updateFoodDescription = (dispatch: React.Dispatch<Action>, generateSuggestions: (desc: string) => void, name: string) => {
  dispatch(setDescription(name));
  generateSuggestions(name);
}

const updateFoodDescriptionServing = (dispatch: React.Dispatch<Action>, name: string, serving?: Serving, bestChoice?: boolean) => {
  dispatch(setDescription(name));
  if (serving) {
    dispatch(setServing(serving));
  }
  dispatch(setBestChoice(_.defaultTo(bestChoice, false)));
}

const updateFoodGroupServing = (dispatch: React.Dispatch<Action>, foodGroup: FoodGroup, serving: number) =>
  serving ? dispatch(setFoodGroupServing({ foodGroup, serving })) : dispatch(unsetFoodGroupServing(foodGroup));

const handleSubmit = (
  dispatch: React.Dispatch<Action>,
  state: { food: Food },
  onSaveFood: (food: Food) => void,
  event: React.FormEvent<HTMLFormElement>
) => {
  const error = validateFood(state.food);
  if (checkValidity(error) === false) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(validationFailed(error));
  } else {
    onSaveFood(state.food);
    event.preventDefault();
  }
}

const _toggleBestChoice = (dispatch: React.Dispatch<Action>) => dispatch(toggleBestChoice());
const _setExpand = (dispatch: React.Dispatch<Action>, expand: boolean) => dispatch(setExpand(expand));

export function useFoodInputFormStateReducer(initialFood: Food, onSaveFood: (food: Food) => void) {
  const [state, dispatch] = useReducer(reducer, initialFood, initialState);

  const descRef = useRef(initialFood.description);
  const setSuggestionsCallback = (suggestions: Suggestion[]) => {
    dispatch(setSuggestions(suggestions));
  }

  const generateSuggestions = (desc: string) => {
    descRef.current = desc;
    debouncedGenerateSuggestions(descRef, setSuggestionsCallback);
  }

  useEffect(() => {
    debouncedGenerateSuggestions(descRef, setSuggestionsCallback);
  }, [descRef, dispatch])

  const fns = {
    updateFoodDescription: _.partial(updateFoodDescription, dispatch, generateSuggestions),
    updateFoodDescriptionServing: _.partial(updateFoodDescriptionServing, dispatch),
    updateFoodGroupServing: _.partial(updateFoodGroupServing, dispatch),
    handleSubmit: _.partial(handleSubmit, dispatch, state, onSaveFood),
    toggleBestChoice: _.partial(_toggleBestChoice, dispatch),
    setExpand: _.partial(_setExpand, dispatch),
  }
  return [state, fns] as [typeof state, typeof fns];
}
