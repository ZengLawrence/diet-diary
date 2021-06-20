import { createAction, createReducer } from "@reduxjs/toolkit";
import _ from "lodash";
import { useReducer } from "react";
import { useSuggestions } from "../../features/suggestions";
import { Food, FoodGroup } from "../../model/Food";

const setServing = createAction<{ foodGroup: FoodGroup, serving: number }>("set-serving");
const unsetServing = createAction<FoodGroup>("unset-serving");
const setName = createAction<string>("set-name");
const validationFailed = createAction<ValidationError>("validation-failed");

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

const INITIAL_STATE: State = {
  food: { name: "", serving: {} },
  error: {}
}

const reducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(setName, (state, action) => {
      state.food.name = action.payload;
      state.error = validateFood(state.food);
    })
    .addCase(setServing, (state, action) => {
      _.set(state.food.serving, action.payload.foodGroup, action.payload.serving);
      state.error = validateFood(state.food);
    })
    .addCase(unsetServing, (state, action) => {
      _.unset(state.food.serving, action.payload);
      state.error = validateFood(state.food);
    })
    .addCase(validationFailed, (state, action) => {
      state.error = action.payload;
    })
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
