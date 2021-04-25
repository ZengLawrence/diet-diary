import _ from "lodash";
import { Col, Form, Row } from "react-bootstrap"
import { FoodGroupBadge } from "../components/FoodGroupBadge";
import { FoodGroup } from "../model/Food";

const FOOD_GROUP_CALORIES = {
  "vegetable": 25,
  "fruit": 60,
  "carbohydrate": 70,
  "protein": 110,
  "fat": 45,
  "sweet": 75,
};

const ServingInputControl = (props: { foodGroup: FoodGroup }) => {
  const { foodGroup } = props;
  const controlId = "formServing" + foodGroup;
  const calories = _.toString(_.get(FOOD_GROUP_CALORIES, foodGroup, 0)) + " Cal.";
  return (
    <Form.Group as={Row} controlId={controlId}>
      <Form.Label column sm={4}>
        {_.capitalize(foodGroup)}{' '}<FoodGroupBadge foodGroup={foodGroup} value={calories}/>
      </Form.Label>
      <Col sm={2}>
        <Form.Control type="text" />
      </Col>
    </Form.Group>
  )
}

export const MealInputPage = () => {
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
        <Form.Label>Servings</Form.Label>
      </Form.Group>
      <Form.Group controlId="formServings">
        <ServingInputControl foodGroup="vegetable" />
        <ServingInputControl foodGroup="fruit" />
        <ServingInputControl foodGroup="carbohydrate" />
        <ServingInputControl foodGroup="protein" />
        <ServingInputControl foodGroup="fat" />
        <ServingInputControl foodGroup="sweet" />
      </Form.Group>

    </Form>
  )
}