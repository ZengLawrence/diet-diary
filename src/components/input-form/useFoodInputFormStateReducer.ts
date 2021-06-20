import { AnyAction, combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useEffect, useReducer, useRef } from "react";
import { generatePortionSuggestions, generateServingSuggestions, PortionSuggestion, ServingSuggestion } from "../../features/suggestions";
import { Food, FoodGroup } from "../../model/Food";

interface ValidationError {
  foodName?: boolean;
  vegetable?: boolean;
  fruit?: boolean;
  carbohydrate?: boolean;
  proteinDiary?: boolean;
  fat?: boolean;
  sweet?: boolean;
}

const food = createSlice({
  name: "food",
  initialState: { name: "", serving: {} } as Food,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setServing(state, action: PayloadAction<{ foodGroup: FoodGroup; serving: number }>) {
      _.set(state.serving, action.payload.foodGroup, action.payload.serving)
    },
    unsetServing(state, action: PayloadAction<FoodGroup>) {
      _.unset(state.serving, action.payload)
    },
  }
})
const { setName, setServing, unsetServing } = food.actions;

const error = createSlice({
  name: "error",
  initialState: {} as ValidationError,
  reducers: {
    validationFailed: (state, action) => _.assign(state, action.payload),
  },
  extraReducers: builder => {
    builder
      .addCase(setName, (state, action) => {
        state.foodName = _.isEmpty(action.payload);
      })
      .addCase(setServing, (state, action) => {
        state[action.payload.foodGroup] = lessThanZero(action.payload.serving);
      })
      .addCase(unsetServing, (state, action) => {
        state[action.payload] = false;
      })
  }
})
const { validationFailed } = error.actions;

const suggestions = createSlice({
  name: "suggestions",
  initialState: {
    servingSuggestions: [] as ServingSuggestion[],
    portionSuggestions: [] as PortionSuggestion[],
  },
  reducers: {
    setServingSuggestions: (state, action: PayloadAction<ServingSuggestion[]>) => {
      state.servingSuggestions = action.payload;
    },
    setPortionSuggestions: (state, action: PayloadAction<PortionSuggestion[]>) => {
      state.portionSuggestions = action.payload;
    },
  }
})
const { setServingSuggestions, setPortionSuggestions } = suggestions.actions;

const reducer = combineReducers({
  food: food.reducer,
  error: error.reducer,
  suggestions: suggestions.reducer,
})

function initialState(food: Food) {
  return {
    food,
    error: {},
    suggestions: {
      servingSuggestions: [],
      portionSuggestions: [],
    }
  };
}

function lessThanZero(val?: number) { return (_.toNumber(val) < 0); }

function validateFood(food: Food): ValidationError {
  const { name, serving } = food;
  return {
    foodName: _.isEmpty(name),
    vegetable: lessThanZero(serving.vegetable),
    fruit: lessThanZero(serving.fruit),
    carbohydrate: lessThanZero(serving.carbohydrate),
    proteinDiary: lessThanZero(serving.proteinDiary),
    fat: lessThanZero(serving.fat),
    sweet: lessThanZero(serving.sweet),
  };
}

function checkValidity(error: ValidationError) {
  const or = (res: boolean, val: boolean | undefined) => res || _.defaultTo(val, false);
  const failed = _.reduce(_.values(error), or, false);
  return !failed;
}

const debouncedGenerateServingSuggestions = _.debounce(generateServingSuggestions, 500, { maxWait: 2000 });
const debouncedGeneratePortionSuggestions = _.debounce(generatePortionSuggestions, 500, { maxWait: 2000 });

const updateFoodName = (dispatch: React.Dispatch<AnyAction>, generateSuggestions: (desc: string) => void, name: string) => {
  dispatch(setName(name));
  generateSuggestions(name);
}

const updateServing = (dispatch: React.Dispatch<AnyAction>, foodGroup: FoodGroup, serving: number) =>
  serving ? dispatch(setServing({ foodGroup, serving })) : dispatch(unsetServing(foodGroup));


const handleSubmit = (
  dispatch: React.Dispatch<AnyAction>,
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

export function useFoodInputFormStateReducer(initialFood: Food, onSaveFood: (food: Food) => void) {
  const [state, dispatch] = useReducer(reducer, initialFood, initialState);

  const descRef = useRef(initialFood.name);
  const setServingSuggestionsCallback = (suggestions: ServingSuggestion[]) => dispatch(setServingSuggestions(suggestions));
  const setPortionSuggestionsCallback = (suggestions: PortionSuggestion[]) => dispatch(setPortionSuggestions(suggestions));
  const generateSuggestions = (desc: string) => {
    descRef.current = desc;
    debouncedGenerateServingSuggestions(descRef, setServingSuggestionsCallback);
    debouncedGeneratePortionSuggestions(descRef, setPortionSuggestionsCallback);
  }

  useEffect(() => {
    debouncedGenerateServingSuggestions(descRef, setServingSuggestionsCallback);
    debouncedGeneratePortionSuggestions(descRef, setPortionSuggestionsCallback);
  }, [descRef, dispatch])

  const fns = {
    updateFoodName: _.partial(updateFoodName, dispatch, generateSuggestions),
    updateServing: _.partial(updateServing, dispatch),
    handleSubmit: _.partial(handleSubmit, dispatch, state, onSaveFood),
  }
  return [state, fns] as [typeof state, typeof fns];
}
