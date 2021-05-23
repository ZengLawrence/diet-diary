import { Serving } from "../../model/Food";
import { FoodGroupServingBadge } from ".";

export const FoodGroupServingBadgePanel = (props: { serving: Serving; goal?: boolean }) => (
  <div>
    <FoodGroupServingBadge foodGroup="vegetable" serving={props.serving} goal={props.goal} />
    <FoodGroupServingBadge foodGroup="fruit" serving={props.serving} goal={props.goal} />
    <FoodGroupServingBadge foodGroup="carbohydrate" serving={props.serving} goal={props.goal} />
    <FoodGroupServingBadge foodGroup="proteinDiary" serving={props.serving} goal={props.goal} />
    <FoodGroupServingBadge foodGroup="fat" serving={props.serving} goal={props.goal} />
    <FoodGroupServingBadge foodGroup="sweet" serving={props.serving} goal={props.goal} />
  </div>
);
