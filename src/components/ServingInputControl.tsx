import _ from "lodash";
import { Col, Form, Row } from "react-bootstrap";
import { FoodGroupBadge } from "./FoodGroupBadge";
import { FoodGroup, getCalories } from "../model/Food";

export const ServingInputControl = (props: { foodGroup: FoodGroup; onChange: (foodGroup: FoodGroup, serving: number) => void; }) => {
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
  );
};
