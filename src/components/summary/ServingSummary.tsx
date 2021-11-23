import { Fragment } from "react";
import TargetAchievementIcon from "../../features/summary/TargetAchievementIcon";
import { FoodGroup, Serving } from "../../model/Food";
import { displayServingValue } from "../../model/servingFunction";
import { FoodGroupLabelBadge } from "../badge";
import { FoodGroupLegend } from "../FoodGroupLegend";

const CalorieText = (props: { amount?: number; }) => (
  <Fragment>
    <div className="d-block d-sm-none">{displayServingValue(props.amount)}</div>
    <div className="d-none d-sm-block text-center" style={{ fontSize: '32px', minWidth: '110px' }}>{displayServingValue(props.amount)}</div>
  </Fragment>
)

const FoodGroupLabel = (props: { foodGroup: FoodGroup; }) => (
  <Fragment>
    <div className="d-block d-sm-none">
      <FoodGroupLabelBadge foodGroup={props.foodGroup} />
    </div>
    <div className="d-none d-sm-block">
      <FoodGroupLegend foodGroup={props.foodGroup} />
    </div>
  </Fragment>
)

const ServingCell = (props: { foodGroup: FoodGroup; amount?: number; }) => (
  <div className="d-flex flex-column align-items-center m-1">
    <CalorieText amount={props.amount} />
    <div className="d-flex align-items-center">
      <TargetAchievementIcon foodGroup={props.foodGroup} />
      <FoodGroupLabel foodGroup={props.foodGroup} />
    </div>
  </div>
);

export const ServingSummary = (props: { serving: Serving; }) => (
  <div className="d-flex justify-content-between flex-fill flex-wrap">
    <ServingCell foodGroup="vegetable" amount={props.serving.vegetable} />
    <ServingCell foodGroup="fruit" amount={props.serving.fruit} />
    <ServingCell foodGroup="carbohydrate" amount={props.serving.carbohydrate} />
    <ServingCell foodGroup="proteinDiary" amount={props.serving.proteinDiary} />
    <ServingCell foodGroup="fat" amount={props.serving.fat} />
    <ServingCell foodGroup="sweet" amount={props.serving.sweet} />
  </div>
)