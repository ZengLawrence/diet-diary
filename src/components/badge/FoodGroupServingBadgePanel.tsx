import { Serving } from "../../model/Food";
import { FoodGroupServingBadge } from ".";

export const FoodGroupServingBadgePanel = (props: { serving: Serving; }) => (
  <div>
    <FoodGroupServingBadge foodGroup="vegetable" serving={props.serving} />
    <FoodGroupServingBadge foodGroup="fruit" serving={props.serving} />
    <FoodGroupServingBadge foodGroup="carbohydrate" serving={props.serving} />
    <FoodGroupServingBadge foodGroup="proteinDiary" serving={props.serving} />
    <FoodGroupServingBadge foodGroup="fat" serving={props.serving} />
    <FoodGroupServingBadge foodGroup="sweet" serving={props.serving} />
  </div>
);