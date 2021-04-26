import _ from "lodash";
import { useReducer } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { FoodGroup, Serving, totalCalories } from "../model/Food";
import { ServingInputControl } from "../components/ServingInputControl";

function reducer(state: Serving, action: { type: string; foodGroup: FoodGroup; serving: number | undefined }) {
  switch (action.type) {
    case 'set':
      return _.set(_.clone(state), action.foodGroup, action.serving);
    default:
      throw new Error();
  }
}

export const MealInputPage = () => {
  const [serving, dispatch] = useReducer(reducer, {} as Serving);
  const handleChange = (foodGroup: FoodGroup, serving: number) => {
    dispatch({
      type: "set",
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
        <Form.Label>Servings (Total Calories: {totalCalories(serving)})</Form.Label>
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