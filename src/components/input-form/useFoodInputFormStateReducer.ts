import { AnyAction, combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useEffect, useReducer, useRef } from "react";
import { generateSuggestions, PortionSuggestion, ServingSuggestion } from "../../features/suggestions";
import { Food, FoodGroup } from "../../model/Food";
import { minus, oneServingOf, positiveServing } from "../../model/servingFunction";
import { initSelectable, Selectable } from "../../model/Selectable";
import { separateSuggestions } from "./separateSuggestions";

interface ValidationError {
  foodName?: boolean;
  vegetable?: boolean;
  fruit?: boolean;
  carbohydrate?: boolean;
  proteinDiary?: boolean;
  fat?: boolean;
  sweet?: boolean;
}

function clearSelection(obj: Selectable) {
  obj.selected = false;
}

const suggestions = createSlice({
  name: "suggestions",
  initialState: {
    servingSuggestions: [] as (ServingSuggestion & Selectable)[],
    portionSuggestions: [] as (PortionSuggestion & Selectable)[],
  },
  reducers: {
    setServingSuggestions: (state, action: PayloadAction<ServingSuggestion[]>) => {
      state.servingSuggestions = _.map(action.payload, suggestion => initSelectable(suggestion));
    },
    selectServingSuggestion: (state, action: PayloadAction<ServingSuggestion>) => {
      const matched = (suggestion: ServingSuggestion) => _.isEqual(suggestion, action.payload);
      _.forEach(state.servingSuggestions, suggestion => {
        if (matched(suggestion)) {
          suggestion.selected = true;
        } else {
          clearSelection(suggestion);
        }
      });
      _.forEach(state.portionSuggestions, clearSelection);
    },
    unselectServingSuggestion: (state, _action: PayloadAction<ServingSuggestion>) => {
      _.forEach(state.servingSuggestions, clearSelection);
    },
    setPortionSuggestions: (state, action: PayloadAction<PortionSuggestion[]>) => {
      state.portionSuggestions = _.map(action.payload, suggestion => initSelectable(suggestion));
    },
    selectPortionSuggestion: (state, action: PayloadAction<PortionSuggestion>) => {
      const matched = (suggestion: PortionSuggestion) => _.isEqual(suggestion, action.payload);
      _.forEach(state.portionSuggestions, suggestion => {
        if (matched(suggestion)) {
          suggestion.selected = true;
        } else {
          clearSelection(suggestion);
        }
      });
      _.forEach(state.servingSuggestions, clearSelection);
    },
    unselectPortionSuggestion: (state, _action: PayloadAction<PortionSuggestion>) => {
      _.forEach(state.portionSuggestions, clearSelection);
    },
  }
})
const {
  setServingSuggestions, selectServingSuggestion, unselectServingSuggestion,
  setPortionSuggestions, selectPortionSuggestion, unselectPortionSuggestion,
} = suggestions.actions;

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
  },
  extraReducers: builder => {
    builder
      .addCase(selectPortionSuggestion, (state, action) => {
        state.serving = action.payload.serving;
      })
      .addCase(unselectPortionSuggestion, (state, action) => {
        state.serving = positiveServing(minus(state.serving, action.payload.serving));
      })
      .addCase(selectServingSuggestion, (state, action) => {
        state.serving = oneServingOf(action.payload.foodGroup);
      })
      .addCase(unselectServingSuggestion, (state, action) => {
        state.serving = positiveServing(minus(state.serving, oneServingOf(action.payload.foodGroup)));
      })
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

const debouncedGenerateSuggestions = _.debounce(generateSuggestions, 500, { maxWait: 2000 });

const updateFoodName = (dispatch: React.Dispatch<AnyAction>, generateSuggestions: (desc: string) => void, name: string) => {
  dispatch(setName(name));
  generateSuggestions(name);
}

const updateServing = (dispatch: React.Dispatch<AnyAction>, foodGroup: FoodGroup, serving: number) =>
  serving ? dispatch(setServing({ foodGroup, serving })) : dispatch(unsetServing(foodGroup));

const handleSelectPortionSuggestion = (dispatch: React.Dispatch<AnyAction>, suggestion: PortionSuggestion, selected: boolean) =>
  selected ? dispatch(selectPortionSuggestion(suggestion)) : dispatch(unselectPortionSuggestion(suggestion));

const handleSelectServingSuggestion = (dispatch: React.Dispatch<AnyAction>, suggestion: ServingSuggestion, selected: boolean) =>
  selected ? dispatch(selectServingSuggestion(suggestion)) : dispatch(unselectServingSuggestion(suggestion));

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
  const setSuggestionsCallback = (suggestions: (ServingSuggestion | PortionSuggestion)[]) => {
    const { servingSuggestions, portionSuggestions } = separateSuggestions(suggestions);
    dispatch(setServingSuggestions(servingSuggestions));
    dispatch(setPortionSuggestions(portionSuggestions));
  }

  const generateSuggestions = (desc: string) => {
    descRef.current = desc;
    debouncedGenerateSuggestions(descRef, setSuggestionsCallback);
  }

  useEffect(() => {
    debouncedGenerateSuggestions(descRef, setSuggestionsCallback);
  }, [descRef, dispatch])

  const fns = {
    updateFoodName: _.partial(updateFoodName, dispatch, generateSuggestions),
    updateServing: _.partial(updateServing, dispatch),
    handleSubmit: _.partial(handleSubmit, dispatch, state, onSaveFood),
    handleSelectPortionSuggestion: _.partial(handleSelectPortionSuggestion, dispatch),
    handleSelectServingSuggestion: _.partial(handleSelectServingSuggestion, dispatch),
  }
  return [state, fns] as [typeof state, typeof fns];
}
