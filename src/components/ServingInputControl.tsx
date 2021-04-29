import _ from "lodash";
import { Col, Form, Row } from "react-bootstrap";
import { FoodGroup, getCalories, Serving } from "../model/Food";
import { FoodGroupBadge } from "./FoodGroupBadge";

interface Props {
  foodGroup: FoodGroup; 
  serving: Serving;
  onChange: (foodGroup: FoodGroup, serving: number) => void; 
}

export const ServingInputControl = (props: Props) => {
  const { foodGroup, serving } = props;
  const controlId = "formServing" + foodGroup;
  const calories = _.toString(getCalories(foodGroup)) + " Cal.";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = _.toNumber(e.target.value);
    props.onChange(foodGroup, val);
  }

  return (
    <Form.Group as={Row} controlId={controlId}>
      <Form.Label column sm={4}>
        {_.capitalize(foodGroup)}{' '}<FoodGroupBadge foodGroup={foodGroup} value={calories} />
      </Form.Label>
      <Col sm={2}>
        <Form.Control 
          type="text" 
          value={_.get(serving, foodGroup) || ''}
          onChange={handleChange} 
          />
      </Col>
    </Form.Group>
  );
};
