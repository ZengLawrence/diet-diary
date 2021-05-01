import _ from "lodash";
import { useEffect, useState } from "react";
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

  const [servingStr, setServingStr] = useState(_.get(serving, foodGroup) || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setServingStr(val);
    props.onChange(foodGroup, _.toNumber(val));
  }

  useEffect(() => {
    if (_.get(serving, foodGroup) != _.toNumber(servingStr)) {
      // reset happens
      setServingStr(_.get(serving, foodGroup) || '');
    }
  }, [foodGroup, serving]);

  return (
    <Form.Group as={Row} controlId={controlId}>
      <Form.Label column sm={4}>
        {_.capitalize(foodGroup)}{' '}<FoodGroupBadge foodGroup={foodGroup} value={calories} />
      </Form.Label>
      <Col sm={2}>
        <Form.Control
          type="text"
          value={servingStr}
          onChange={handleChange}
        />
      </Col>
    </Form.Group>
  );
};
