import type { Serving } from "../../model/Food";
import FoodGroupServingGoalBadge from "../../features/badge/FoodGroupServingGoalBadge";

export const FoodGroupServingGoalBadgePanel = (props: { serving: Serving; }) => (
  <div>
    <FoodGroupServingGoalBadge foodGroup="vegetable" serving={props.serving} />
    <FoodGroupServingGoalBadge foodGroup="fruit" serving={props.serving} />
    <FoodGroupServingGoalBadge foodGroup="carbohydrate" serving={props.serving} />
    <FoodGroupServingGoalBadge foodGroup="proteinDiary" serving={props.serving} />
    <FoodGroupServingGoalBadge foodGroup="fat" serving={props.serving} />
    <FoodGroupServingGoalBadge foodGroup="sweet" serving={props.serving} />
  </div>
);
