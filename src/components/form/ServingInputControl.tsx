import _ from "lodash";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getCalories } from "../../model/calorieFunction";
import { FoodGroup, Serving } from "../../model/Food";
import { FoodGroupLabelBadge } from "../badge";

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
  useNumeric?: boolean;
}

export const ServingInputControl = (props: Props) => {
  const { foodGroup, isInvalid } = props;
  const controlId = "inputServing" + _.upperFirst(foodGroup);
  const calories = _.toString(getCalories(foodGroup));

  const { servingStr, handleChange } = useSyncedLocalState(props);

  return (
    <Form.Group controlId={controlId} className="border rounded">
      <div className="d-flex flex-row flex-nowrap">
        <FoodGroupLabelBadge foodGroup={foodGroup} />
        <span className="dd-calorie-label">{calories}<span className="dd-x-small-font">Cal.</span></span>
      </div>
      <Form.Control
        type="number"
        inputMode={props.useNumeric ? "numeric" : "decimal"}
        min={0}
        max={9}
        value={servingStr}
        isInvalid={isInvalid}
        onChange={handleChange}
      />
      <Form.Control.Feedback type="invalid" >Enter a number between 0 and 9. Leave blank for 0.</Form.Control.Feedback>
    </Form.Group>
  );
};
