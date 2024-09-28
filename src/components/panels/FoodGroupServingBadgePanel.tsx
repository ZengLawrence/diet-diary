import { Serving } from "../../model/Food";
import { FoodGroupServingBadge } from "../badge";

export const FoodGroupServingBadgePanel = (props: { serving: Serving; }) => (
  <span>
    <FoodGroupServingBadge foodGroup="vegetable" serving={props.serving} />&nbsp;
    <FoodGroupServingBadge foodGroup="fruit" serving={props.serving} />&nbsp;
    <FoodGroupServingBadge foodGroup="carbohydrate" serving={props.serving} />&nbsp;
    <FoodGroupServingBadge foodGroup="proteinDiary" serving={props.serving} />&nbsp;
    <FoodGroupServingBadge foodGroup="fat" serving={props.serving} />&nbsp;
    <FoodGroupServingBadge foodGroup="sweet" serving={props.serving} />
  </span>
);
