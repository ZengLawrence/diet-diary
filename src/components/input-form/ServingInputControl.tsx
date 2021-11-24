import _ from "lodash";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getCalories } from "../../model/calorieFunction";
import { FoodGroup, Serving } from "../../model/Food";
import { FoodGroupLabelBadge, InfoLabelBadge } from "../badge";

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
  const controlId = "inputServing" + _.upperFirst(foodGroup);
  const calories = _.toString(getCalories(foodGroup)) + " Cal.";

  const { servingStr, handleChange } = useSyncedLocalState(props);

  return (
    <Form.Group controlId={controlId} className="d-flex flex-column align-items-end border rounded mx-1">
      <div>
        <FoodGroupLabelBadge foodGroup={foodGroup} />
        <InfoLabelBadge value={calories} />
      </div>
      <Form.Control
        type="number"
        inputMode="decimal"
        min={0}
        max={9.99}
        value={servingStr}
        isInvalid={isInvalid}
        onChange={handleChange}
      />
      <Form.Control.Feedback type="invalid" style={{ maxWidth: "100px" }}>Good one!  Please enter a positive number.</Form.Control.Feedback>
    </Form.Group>
  );
};
