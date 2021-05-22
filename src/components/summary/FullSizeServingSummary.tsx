import { abbreviation, displayName, FoodGroup, Serving } from "../../model/Food";
import { FoodGroupBadge } from "../badge";

const FoodGroupLabel = (props: { foodGroup: FoodGroup; }) => {
  const { foodGroup } = props;
  return (
    <div className="d-flex justify-content-center border-0 rounded bg-light">
      <FoodGroupBadge foodGroup={foodGroup} value={abbreviation(foodGroup)} />
      <div>{displayName(foodGroup)}</div>
    </div>
  );
};

const ServingCell = (props: { foodGroup: FoodGroup; amount?: number; }) => (
  <div className="d-flex flex-column justify-content-end m-1">
    <div className="text-center" style={{ fontSize: '32px', minWidth: '110px' }}>{props.amount}</div>
    <FoodGroupLabel foodGroup={props.foodGroup} />
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
