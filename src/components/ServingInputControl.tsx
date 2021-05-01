import _ from "lodash";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FoodGroup, getCalories, Serving } from "../model/Food";
import { FoodGroupBadge } from "./FoodGroupBadge";

function useSyncedLocalState(props: Props) {
  const { foodGroup, serving } = props;
  const [servingStr, setServingStr] = useState(_.get(serving, foodGroup) || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setServingStr(val);
    props.onChange(foodGroup, _.toNumber(val));
  }

  useEffect(() => {
      // syncing with parent state
      setServingStr(_.get(serving, foodGroup) || '');
  }, [foodGroup, serving]);

  return { servingStr, handleChange };
}

interface Props {
  foodGroup: FoodGroup;
  serving: Serving;
  onChange: (foodGroup: FoodGroup, serving: number) => void;
}

export const ServingInputControl = (props: Props) => {
  const { foodGroup } = props;
  const controlId = "formServing" + foodGroup;
  const calories = _.toString(getCalories(foodGroup)) + " Cal.";

  const { servingStr, handleChange } = useSyncedLocalState(props);

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
