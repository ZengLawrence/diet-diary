import TargetActionIcon from "../../features/summary/TargetActionIcon";
import { FoodGroup } from "../../model/Food";
import { displayServingValue } from "../../model/servingFunction";
import { FoodGroupLabel } from "./FoodGroupLabel";

const CalorieText = (props: { amount?: number; }) => (
    <div className="dd-serving-cell-calorie">{displayServingValue(props.amount)}</div>
);

interface Props {
  foodGroup: FoodGroup;
  amount?: number;
}

export const ServingCell = (props: Props) => (
  <div className="d-flex flex-column align-items-center">
    <CalorieText amount={props.amount} />
    <div className="d-flex align-items-center">
      {<TargetActionIcon foodGroup={props.foodGroup} />}
      <FoodGroupLabel foodGroup={props.foodGroup} />
    </div>
  </div>
);
