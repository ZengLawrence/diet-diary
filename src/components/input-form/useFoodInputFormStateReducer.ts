import { createAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useReducer } from "react";
import { useSuggestions } from "../../features/suggestions";
import { Food, FoodGroup } from "../../model/Food";

const setServingAction = createAction<{ foodGroup: FoodGroup, serving: number }>("set-serving");

type SetServingAction = ReturnType<typeof setServingAction>;

const unsetServingAction = createAction<FoodGroup>("unset-serving");

type UnsetServingAction = ReturnType<typeof unsetServingAction>;

const setNameAction = createAction<string>("set-name");

type SetNameAction = ReturnType<typeof setNameAction>;

const validationFailedAction = createAction<ValidationError>("validation-failed");

type ValidationFailedAction = ReturnType<typeof validationFailedAction>;

function setServing(food: Food, action: SetServingAction) {
  return {
    ...food,
    serving: _.set(_.clone(food.serving), action.payload.foodGroup, action.payload.serving),
  };
}

function unsetServing(food: Food, action: UnsetServingAction) {
  const serving = _.clone(food.serving);
  _.unset(serving, action.payload);
  return {
    ...food,
    serving,
  };
}

function setName(food: Food, action: SetNameAction) {
  return {
    ...food,
    name: action.payload,
  };
}

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

type ActionType = SetNameAction | SetServingAction | UnsetServingAction | ValidationFailedAction;

function reducer(state: State, action: ActionType) {
  switch (action.type) {
    case 'set-name':
      return {
        ...state,
        food: setName(state.food, action as SetNameAction),
        error: validateFood(setName(state.food, action as SetNameAction)),
      };
    case 'set-serving':
      return {
        ...state,
        food: setServing(state.food, action as SetServingAction),
        error: validateFood(setServing(state.food, action as SetServingAction)),
      };
    case 'unset-serving':
      return {
        ...state,
        food: unsetServing(state.food, action as UnsetServingAction),
        error: validateFood(unsetServing(state.food, action as UnsetServingAction)),
      };
    case 'validation-failed':
      const validationFailedAction = action as ValidationFailedAction;
      return {
        ...state,
        error: validationFailedAction.payload,
      };
    default:
      throw new Error();
  }
}

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
    dispatch(setNameAction(name));
    generateSuggestions(name);
  }

  const updateServing = (foodGroup: FoodGroup, serving: number) =>
    serving ? dispatch(setServingAction({foodGroup, serving})) : dispatch(unsetServingAction(foodGroup));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const error = validateFood(food);
    if (checkValidity(error) === false) {
      event.preventDefault();
      event.stopPropagation();
      dispatch(validationFailedAction(error));
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
