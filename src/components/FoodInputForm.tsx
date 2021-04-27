import _ from "lodash";
import { useReducer } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { ServingInputControl } from "./ServingInputControl";
import { Food, FoodGroup, totalCalories } from "../model/Food";

interface Action {
  type: string;
}

interface SetServingAction extends Action {
  type: "set-serving";
  foodGroup: FoodGroup; 
  serving: number | undefined;
}

function setServing(food: Food, action: SetServingAction) {
  return {
    ...food,
    serving: _.set(food.serving, action.foodGroup, action.serving),
  };
}

function reducer(state: Food, action: Action | SetServingAction) {
  switch (action.type) {
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
  const handleChange = (foodGroup: FoodGroup, serving: number) => {
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
        />
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label>Servings (Total Calories: {totalCalories(food.serving)})</Form.Label>
      </Form.Group>
      <Form.Group controlId="formServings">
        <ServingInputControl foodGroup="vegetable" onChange={handleChange} />
        <ServingInputControl foodGroup="fruit" onChange={handleChange} />
        <ServingInputControl foodGroup="carbohydrate" onChange={handleChange} />
        <ServingInputControl foodGroup="protein" onChange={handleChange} />
        <ServingInputControl foodGroup="fat" onChange={handleChange} />
        <ServingInputControl foodGroup="sweet" onChange={handleChange} />
      </Form.Group>

      <Button type="submit" variant="primary">Add</Button>{' '}
      <Button variant="secondary">Close</Button>
    </Form>
  )
}