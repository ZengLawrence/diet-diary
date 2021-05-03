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
  failedValidation: FailedValidation;
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

interface FailedValidation {
  vegetable?: boolean,
  fruit?: boolean,
  carbohydrate?: boolean,
  protein?: boolean,
  fat?: boolean,
  sweet?: boolean,
}

function isInvalid(failedValidation: FailedValidation, foodGroup: FoodGroup) {
  return _.get(failedValidation, foodGroup, false);
}

interface State {
  food: Food;
  validated: boolean;
  failedValidation: FailedValidation;
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
        failedValidation: validationFailedAction.failedValidation,
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
    validated: false,
    failedValidation: {},
  }
}

function validateServing(serving: Serving) : FailedValidation{
  const lessThanZero = (val?: number) => (_.toNumber(val) < 0);
  return {
    vegetable: lessThanZero(serving.vegetable),
    fruit: lessThanZero(serving.fruit),
    carbohydrate: lessThanZero(serving.carbohydrate),
    protein: lessThanZero(serving.protein),
    fat: lessThanZero(serving.fruit),
    sweet: lessThanZero(serving.sweet),  
  }
}

export const FoodInputForm = (props: { onAddFood: (food: Food) => void; onCancel: () => void }) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  const { food, validated, failedValidation } = state;
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

  function checkValidity(failedValidation : FailedValidation) {
    const failed = _.reduce(_.values(failedValidation), (res, val) => (res || _.defaultTo(val, false)), false);
    return !failed;
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const failedValidation = validateServing(food.serving);
    if (form.checkValidity() === false ||
      checkValidity(failedValidation) === false) {
      event.preventDefault();
      event.stopPropagation();
      dispatch({
        type: "validation-failed",
        failedValidation
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
      validated={validated}
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
          onChange={e => handleNameChange(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter food name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Servings (Calories: {calcFoodCalories(food)})</Form.Label>
        <Form.Group controlId="formServings" className="border p-1">
          <ServingInputControl foodGroup="vegetable" serving={food.serving} isInvalid={isInvalid(failedValidation, "vegetable")} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fruit" serving={food.serving} isInvalid={isInvalid(failedValidation, "fruit")} onChange={handleServingChange} />
          <ServingInputControl foodGroup="carbohydrate" serving={food.serving} isInvalid={isInvalid(failedValidation, "carbohydrate")} onChange={handleServingChange} />
          <ServingInputControl foodGroup="protein" serving={food.serving} isInvalid={isInvalid(failedValidation, "protein")} onChange={handleServingChange} />
          <ServingInputControl foodGroup="fat" serving={food.serving} isInvalid={isInvalid(failedValidation, "fat")} onChange={handleServingChange} />
          <ServingInputControl foodGroup="sweet" serving={food.serving} isInvalid={isInvalid(failedValidation, "sweet")} onChange={handleServingChange} />
        </Form.Group>
      </Form.Group>

      <Button type="submit" variant="primary">Add</Button>{' '}
      <Button variant="secondary" onClick={props.onCancel}>Cancel</Button>
    </Form>
  )
}