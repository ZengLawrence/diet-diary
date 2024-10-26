import { Fragment } from "react";
import TargetActionIcon from "../../features/summary/TargetActionIcon";
import { FoodGroup } from "../../model/Food";
import { displayServingValue } from "../../model/servingFunction";
import { FoodGroupLabelBadge } from "../badge";
import { FoodGroupLegend } from "../FoodGroupLegend";

const CalorieText = (props: { amount?: number; percentAmount?: boolean; }) => (
  <Fragment>
    <div className="d-block d-sm-none">{displayServingValue(props.amount, props.percentAmount)}{props.percentAmount && '%'}</div>
    <div className="d-none d-sm-block text-center" style={{ fontSize: '32px', minWidth: '110px' }}>{displayServingValue(props.amount, props.percentAmount)}{props.percentAmount && '%'}</div>
  </Fragment>
);

const FoodGroupLabel = (props: { foodGroup: FoodGroup; }) => (
  <Fragment>
    <div className="d-block d-sm-none">
      <FoodGroupLabelBadge foodGroup={props.foodGroup} />
    </div>
    <div className="d-none d-sm-block">
      <FoodGroupLegend foodGroup={props.foodGroup} />
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
