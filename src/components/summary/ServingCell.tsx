import { Fragment } from "react";
import TargetActionIcon from "../../features/summary/TargetActionIcon";
import { FoodGroup } from "../../model/Food";
import { displayServingValue } from "../../model/servingFunction";
import { FoodGroupLabel } from "./FoodGroupLabel";

const CalorieText = (props: { amount?: number; percentAmount?: boolean; }) => (
  <Fragment>
    <div className="d-block d-sm-none">{displayServingValue(props.amount, props.percentAmount)}{props.percentAmount && '%'}</div>
    <div className="d-none d-sm-block text-center">
      <span className="fs-2" >{displayServingValue(props.amount, props.percentAmount)}</span>{props.percentAmount && '%'}
    </div>
  </Fragment>
);

interface Props {
  foodGroup: FoodGroup;
  amount?: number;
  percentAmount?: boolean;
  showTargetActionIcon: boolean;
}

export const ServingCell = (props: Props) => (
  <div className="d-flex flex-column align-items-center m-1">
    <CalorieText amount={props.amount} percentAmount={props.percentAmount} />
    <div className="d-flex align-items-center">
      {props.showTargetActionIcon && <TargetActionIcon foodGroup={props.foodGroup} />}
      <FoodGroupLabel foodGroup={props.foodGroup} />
    </div>
  </div>
);
