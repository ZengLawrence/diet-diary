import _ from "lodash";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getCalories } from "../../model/calorieFunction";
import { FoodGroup, Serving } from "../../model/Food";
import { FoodGroupBadge } from "../FoodGroupBadge";

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
  isInvalid?: boolean;
  onChange: (foodGroup: FoodGroup, serving: number) => void;
}

export const ServingInputControl = (props: Props) => {
  const { foodGroup, isInvalid } = props;
  const controlId = "formServing" + foodGroup;
  const calories = _.toString(getCalories(foodGroup)) + " Cal.";

  const { servingStr, handleChange } = useSyncedLocalState(props);

  return (
    <Form.Group controlId={controlId} className="mr-1">
      <Form.Label>
        {_.capitalize(foodGroup)}{' '}<FoodGroupBadge foodGroup={foodGroup} value={calories} />
      </Form.Label>
      <Form.Control
        type="number"
        min={0}
        max={99}
        value={servingStr}
        isInvalid={isInvalid}
        onChange={handleChange}
        style={{ maxWidth: "80px" }}
      />
      <Form.Control.Feedback type="invalid">Good one!  Please enter a positive number.</Form.Control.Feedback>
    </Form.Group>
  );
};
