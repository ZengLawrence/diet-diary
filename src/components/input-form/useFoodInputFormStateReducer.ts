import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useReducer } from "react";
import { useSuggestions } from "../../features/suggestions";
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

interface State {
  food: Food;
  error: ValidationError;
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
        state.foodName = (action.payload === '');
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
})

function initialState(food: Food): State {
  return {
    food,
    error: {},
  };
}

function lessThanZero(val?: number) { return (_.toNumber(val) < 0); }

function validateFood(food: Food): ValidationError {
  const { name, serving } = food;
  return {
    foodName: (name === ''),
    vegetable: lessThanZero(serving.vegetable),
    fruit: lessThanZero(serving.fruit),
    carbohydrate: lessThanZero(serving.carbohydrate),
    proteinDiary: lessThanZero(serving.proteinDiary),
    fat: lessThanZero(serving.fat),
    sweet: lessThanZero(serving.sweet),
  };
}

function checkValidity(error: ValidationError) {
  const failed = _.reduce(_.values(error), (res, val) => (res || _.defaultTo(val, false)), false);
  return !failed;
}

export function useFoodInputFormStateReducer(initialFood: Food, onSaveFood: (food: Food) => void) {
  const [state, dispatch] = useReducer(reducer, initialState(initialFood));
  const { food, error } = state;

  const [suggestions, generateSuggestions] = useSuggestions(initialFood.name);

  const updateFoodName = (name: string) => {
    dispatch(setName(name));
    generateSuggestions(name);
  }

  const updateServing = (foodGroup: FoodGroup, serving: number) =>
    serving ? dispatch(setServing({ foodGroup, serving })) : dispatch(unsetServing(foodGroup));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const error = validateFood(food);
    if (checkValidity(error) === false) {
      event.preventDefault();
      event.stopPropagation();
      dispatch(validationFailed(error));
    } else {
      onSaveFood(food);
      event.preventDefault();
    }
  };

  return {
    food,
    error,
    suggestions,
    updateFoodName,
    updateServing,
    handleSubmit
  };
}
