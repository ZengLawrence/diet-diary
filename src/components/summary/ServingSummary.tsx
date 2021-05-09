import { FoodGroup, Serving } from "../../model/Food";
import { backgroundColor } from "../backgroundColor";

const FoodGroupLabel = (props: { foodGroup: FoodGroup; }) => {
  const { foodGroup } = props;
  const style: React.CSSProperties = {
    backgroundColor: backgroundColor(foodGroup),
  };
  return (
    <div className="text-center text-white font-weight-bold" style={style}>{foodGroup}</div>
  );
};

const ServingCell = (props: { foodGroup: FoodGroup; amount?: number; }) => (
  <div className="d-flex flex-column justify-content-end m-1">
    <div className="text-center" style={{ fontSize: '32px', minWidth: '110px' }}>{props.amount}</div>
    <FoodGroupLabel foodGroup={props.foodGroup} />
  </div>
);

export const ServingSummary = (props: { serving: Serving; }) => (
  <div className="d-flex justify-content-between flex-fill flex-wrap">
    <ServingCell foodGroup="vegetable" amount={props.serving.vegetable} />
    <ServingCell foodGroup="fruit" amount={props.serving.fruit} />
    <ServingCell foodGroup="carbohydrate" amount={props.serving.carbohydrate} />
    <ServingCell foodGroup="protein" amount={props.serving.protein} />
    <ServingCell foodGroup="fat" amount={props.serving.fat} />
    <ServingCell foodGroup="sweet" amount={props.serving.sweet} />
  </div>
);
