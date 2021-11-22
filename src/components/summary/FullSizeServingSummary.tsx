import TargetAchievementIcon from "../../features/summary/TargetAchievementIcon";
import { FoodGroup, Serving } from "../../model/Food";
import { displayServingValue } from "../../model/servingFunction";
import { FoodGroupLegend } from "../FoodGroupLegend";

const ServingCell = (props: { foodGroup: FoodGroup; amount?: number; }) => (
  <div className="d-flex flex-column justify-content-end m-1">
    <div className="text-center" style={{ fontSize: '32px', minWidth: '110px' }}>{displayServingValue(props.amount)}</div>
    <div className="d-flex align-items-center">
      <TargetAchievementIcon foodGroup={props.foodGroup} />
      <FoodGroupLegend foodGroup={props.foodGroup} />
    </div>
  </div>
);

export const FullSizeServingSummary = (props: { serving: Serving; }) => (
  <div className="d-flex justify-content-between flex-fill flex-wrap">
    <ServingCell foodGroup="vegetable" amount={props.serving.vegetable} />
    <ServingCell foodGroup="fruit" amount={props.serving.fruit} />
    <ServingCell foodGroup="carbohydrate" amount={props.serving.carbohydrate} />
    <ServingCell foodGroup="proteinDiary" amount={props.serving.proteinDiary} />
    <ServingCell foodGroup="fat" amount={props.serving.fat} />
    <ServingCell foodGroup="sweet" amount={props.serving.sweet} />
  </div>
);
