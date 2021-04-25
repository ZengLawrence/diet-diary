import { Col, Form, Row } from "react-bootstrap"
import { FoodGroup } from "../model/Food";

const ServingInputControl = (props: { foodGroup: FoodGroup }) => {
  const { foodGroup } = props;
  const controlId = "formServing" + foodGroup;
  return (
    <Form.Group as={Row} controlId={controlId}>
      <Form.Label column sm={2}>{foodGroup}</Form.Label>
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