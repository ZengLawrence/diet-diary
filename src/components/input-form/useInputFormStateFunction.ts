import _ from "lodash";
import { useReducer } from "react";
import { Food, FoodGroup, newFood } from "../../model/Food";

interface Action {
  type: string;
}

interface SetServingAction extends Action {
  type: "set-serving";
  foodGroup: FoodGroup;
  serving: number;
}

interface UnsetServingAction extends Action {
  type: "unset-serving";
  foodGroup: FoodGroup;
}

interface SetNameAction extends Action {
  type: "set-name";
  name: string;
}

interface ValidationFailedAction extends Action {
  type: "validation-failed";
  error: ValidationError;
}

function setServing(food: Food, action: SetServingAction) {
  return {
    ...food,
    serving: _.set(_.clone(food.serving), action.foodGroup, action.serving),
  };
}

function unsetServing(food: Food, action: UnsetServingAction) {
  const serving = _.clone(food.serving);
  _.unset(serving, action.foodGroup);
  return {
    ...food,
    serving,
  };
}

function setName(food: Food, action: SetNameAction) {
  return {
    ...food,
    name: action.name,
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

type ActionType = Action | SetNameAction | SetServingAction | UnsetServingAction | ValidationFailedAction;

function reducer(state: State, action: ActionType) {
  switch (action.type) {
    case 'set-name':
      return {
        ...state,
        food: setName(state.food, action as SetNameAction)
      };
    case 'set-serving':
      return {
        ...state,
        food: setServing(state.food, action as SetServingAction)
      };
    case 'unset-serving':
      return {
        ...state,
        food: unsetServing(state.food, action as UnsetServingAction)
      };
    case 'reset':
      return initialState(newFood());
    case 'validation-failed':
      const validationFailedAction = action as ValidationFailedAction;
      return {
        ...state,
        validated: true,
        error: validationFailedAction.error,
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

export function useInputFormStateFunction(initialFood: Food, onAddFood: (food: Food) => void) {
  const [state, dispatch] = useReducer(reducer, initialState(initialFood));
  const { food, error } = state;
  const handleNameChange = (name: string) => {
    dispatch({
      type: "set-name",
      name
    });
  };

  const handleServingChange = (foodGroup: FoodGroup, serving: number) => {
    if (serving === 0) {
      dispatch({
        type: "unset-serving",
        foodGroup,
      });
    } else {
      dispatch({
        type: "set-serving",
        foodGroup,
        serving
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const error = validateFood(food);
    if (checkValidity(error) === false) {
      event.preventDefault();
      event.stopPropagation();
      dispatch({
        type: "validation-failed",
        error
      });
    } else {
      onAddFood(food);
      dispatch({
        type: "reset"
      });
      event.preventDefault();
    }
  };

  return { food, error, handleNameChange, handleServingChange, handleSubmit };
}
