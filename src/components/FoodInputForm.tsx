import _ from "lodash";
import { useReducer } from "react";
import { Button, Form } from "react-bootstrap";
import { calcFoodCalories } from "../model/calorieFunction";
import { Food, FoodGroup, Serving } from "../model/Food";
import { ServingInputControl } from "./ServingInputControl";

interface Action {
  type: string;
}

interface SetServingAction extends Action {
  type: "set-serving";
  foodGroup: FoodGroup;
  serving: number | undefined;
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
    serving: _.set(food.serving, action.foodGroup, action.serving),
  };
}

function setName(food: Food, action: SetNameAction) {
  return {
    ...food,
    name: action.name,
  };
}

interface ValidationError {
  foodName?: boolean,
  vegetable?: boolean,
  fruit?: boolean,
  carbohydrate?: boolean,
  protein?: boolean,
  fat?: boolean,
  sweet?: boolean,
}

interface State {
  food: Food;
  error: ValidationError;
}

function reducer(state: State, action: Action | SetNameAction | SetServingAction | ValidationFailedAction) {
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
      }
    case 'reset':
      return initialState();
    case 'validation-failed':
      const validationFailedAction = action as ValidationFailedAction;
      return {
        ...state,
        validated: true,
        error: validationFailedAction.error,
      }
    default:
      throw new Error();
  }
}

function initialState(): State {
  return {
    food: {
      name: "",
      serving: {}
    },
    error: {},
  }
}

function validateServing(serving: Serving): ValidationError {
  const lessThanZero = (val?: number) => (_.toNumber(val) < 0);
  return {
    vegetable: lessThanZero(serving.vegetable),
    fruit: lessThanZero(serving.fruit),
    carbohydrate: lessThanZero(serving.carbohydrate),
    protein: lessThanZero(serving.protein),
    fat: lessThanZero(serving.fat),
    sweet: lessThanZero(serving.sweet),
  }
}

function validateFood(food: Food): ValidationError {
  return {
    foodName: (food.name === ''),
    ...validateServing(food.serving)
  }
}

function checkValidity(error: ValidationError) {
  const failed = _.reduce(_.values(error), (res, val) => (res || _.defaultTo(val, false)), false);
  return !failed;
}

export const FoodInputForm = (props: { onAddFood: (food: Food) => void; onCancel: () => void }) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  const { food, error } = state;
  const handleNameChange = (name: string) => {
    dispatch({
      type: "set-name",
      name
    });
  }

  const handleServingChange = (foodGroup: FoodGroup, serving: number) => {
    dispatch({
      type: "set-serving",
      foodGroup,
      serving
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const error = validateFood(food);
    if (form.checkValidity() === false ||
      checkValidity(error) === false) {
      event.preventDefault();
      event.stopPropagation();
      dispatch({
        type: "validation-failed",
        error
      });
    } else {
      props.onAddFood(food);
      dispatch({
        type: "reset"
      });
      event.preventDefault();
    }
  }

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="border p-1"
    >

      <Form.Group as={Form.Row} controlId="formFoodName" className="ml-1 mr-1">
        <Form.Label>Food name</Form.Label>
        <Form.Control
          type="text"
          value={food.name}
          required
          placeholder="Bread, broccoli, steak, hamburger..."
          isInvalid={error.foodName}
          onChange={e => handleNameChange(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter food name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Servings (Calories: {calcFoodCalories(food)})</Form.Label>
        <Form.Group controlId="formServings" className="border p-1">
          <ServingInputControl foodGroup="vegetable" serving={food.serving} isInvalid={error.vegetable} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fruit" serving={food.serving} isInvalid={error.fruit} onChange={handleServingChange} />
          <ServingInputControl foodGroup="carbohydrate" serving={food.serving} isInvalid={error.carbohydrate} onChange={handleServingChange} />
          <ServingInputControl foodGroup="protein" serving={food.serving} isInvalid={error.protein} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fat" serving={food.serving} isInvalid={error.fat} onChange={handleServingChange} />
          <ServingInputControl foodGroup="sweet" serving={food.serving} isInvalid={error.sweet} onChange={handleServingChange} />
        </Form.Group>
      </Form.Group>

      <Button type="submit" variant="primary">Add</Button>{' '}
      <Button variant="secondary" onClick={props.onCancel}>Cancel</Button>
    </Form>
  )
}