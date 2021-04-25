import _ from "lodash";
import { useReducer } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FoodGroupBadge } from "../components/FoodGroupBadge";
import { FoodGroup, Serving } from "../model/Food";

const FOOD_GROUP_CALORIES = {
  "vegetable": 25,
  "fruit": 60,
  "carbohydrate": 70,
  "protein": 110,
  "fat": 45,
  "sweet": 75,
};

function getCalories(foodGroup: FoodGroup) {
  return _.get(FOOD_GROUP_CALORIES, foodGroup, 0);
}

const ServingInputControl = (props: { foodGroup: FoodGroup; onChange: (foodGroup: FoodGroup, serving: number) => void }) => {
  const { foodGroup, onChange } = props;
  const controlId = "formServing" + foodGroup;
  const calories = _.toString(getCalories(foodGroup)) + " Cal.";

  return (
    <Form.Group as={Row} controlId={controlId}>
      <Form.Label column sm={4}>
        {_.capitalize(foodGroup)}{' '}<FoodGroupBadge foodGroup={foodGroup} value={calories} />
      </Form.Label>
      <Col sm={2}>
        <Form.Control type="text" onChange={e => onChange(foodGroup, parseFloat(e.target.value))} />
      </Col>
    </Form.Group>
  )
}

function reducer(state: Serving, action: { type: string; foodGroup: FoodGroup; serving: number | undefined }) {
  switch (action.type) {
    case 'set':
      return _.set(_.clone(state), action.foodGroup, action.serving);
    default:
      throw new Error();
  }
}

function totalCalories(serving: Serving) {
  const calcCalories = (foodGroup: FoodGroup) => getCalories(foodGroup) * _.get(serving, foodGroup, 0);
  return _.sum(_.map(_.keys(serving), calcCalories));
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