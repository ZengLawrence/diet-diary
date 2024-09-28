import { Serving } from "../../model/Food";
import { FoodGroupServingGoalBadge } from "../badge";

export const FoodGroupServingGoalBadgePanel = (props: { serving: Serving; }) => (
  <div>
    <FoodGroupServingGoalBadge foodGroup="vegetable" serving={props.serving} />&nbsp;
    <FoodGroupServingGoalBadge foodGroup="fruit" serving={props.serving} />&nbsp;
    <FoodGroupServingGoalBadge foodGroup="carbohydrate" serving={props.serving} />&nbsp;
    <FoodGroupServingGoalBadge foodGroup="proteinDiary" serving={props.serving} />&nbsp;
    <FoodGroupServingGoalBadge foodGroup="fat" serving={props.serving} />&nbsp;
    <FoodGroupServingGoalBadge foodGroup="sweet" serving={props.serving} />
  </div>
);
