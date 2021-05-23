import { FoodGroup, Serving } from "../../model/Food";
import { displayServingValue } from "../../model/servingFunction";
import { FoodGroupLabelBadge } from "../badge";

const FoodGroupLabel = (props: { foodGroup: FoodGroup; }) => (
  <FoodGroupLabelBadge foodGroup={props.foodGroup} />
)

const ServingCell = (props: { foodGroup: FoodGroup; amount?: number; }) => (
  <div className="d-flex flex-column align-items-center">
    <div>{displayServingValue(props.amount)}</div>
    <FoodGroupLabel foodGroup={props.foodGroup} />
  </div>
);

export const CompactServingSummary = (props: { serving: Serving; }) => (
  <div className="d-flex justify-content-between flex-fill flex-wrap">
    <ServingCell foodGroup="vegetable" amount={props.serving.vegetable} />
    <ServingCell foodGroup="fruit" amount={props.serving.fruit} />
    <ServingCell foodGroup="carbohydrate" amount={props.serving.carbohydrate} />
    <ServingCell foodGroup="proteinDiary" amount={props.serving.proteinDiary} />
    <ServingCell foodGroup="fat" amount={props.serving.fat} />
    <ServingCell foodGroup="sweet" amount={props.serving.sweet} />
  </div>
);
