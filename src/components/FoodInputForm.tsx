import _ from "lodash";
import { useReducer } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { ServingInputControl } from "./ServingInputControl";
import { Food, FoodGroup, totalFoodCalories } from "../model/Food";

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

function reducer(state: Food, action: SetNameAction | SetServingAction) {
  switch (action.type) {
    case 'set-name':
      return setName(state, action as SetNameAction);
    case 'set-serving':
      return setServing(state, action as SetServingAction);
    default:
      throw new Error();
  }
}

const INITIAL_STATE: Food = {
  name: "",
  serving: {}
}

export const FoodInputForm = () => {
  const [food, dispatch] = useReducer(reducer, INITIAL_STATE);
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

  return (
    <Form>
      <Form.Group as={Row} controlId="formFoodName">
        <Form.Label>Food name</Form.Label>
        <Form.Control
          type="text"
          required
          placeholder="Bread, brocolli, steak, hamburger..."
          onChange={e => handleNameChange(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label>Servings (Total Calories: {totalFoodCalories(food)})</Form.Label>
      </Form.Group>
      <Form.Group controlId="formServings">
        <ServingInputControl foodGroup="vegetable" onChange={handleServingChange} />
        <ServingInputControl foodGroup="fruit" onChange={handleServingChange} />
        <ServingInputControl foodGroup="carbohydrate" onChange={handleServingChange} />
        <ServingInputControl foodGroup="protein" onChange={handleServingChange} />
        <ServingInputControl foodGroup="fat" onChange={handleServingChange} />
        <ServingInputControl foodGroup="sweet" onChange={handleServingChange} />
      </Form.Group>

      <Button type="submit" variant="primary">Add</Button>{' '}
      <Button variant="secondary">Close</Button>
    </Form>
  )
}