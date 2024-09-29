import { Serving } from "../../model/Food";
import { FoodGroupServingBadge } from "../badge";

export const FoodGroupServingBadgePanel = (props: { serving: Serving; }) => {
  const { serving } = props;

  return (
    <span>
      <FoodGroupServingBadge foodGroup="vegetable" serving={serving} />
      <FoodGroupServingBadge foodGroup="fruit" serving={serving} />
      <FoodGroupServingBadge foodGroup="carbohydrate" serving={serving} />
      <FoodGroupServingBadge foodGroup="proteinDiary" serving={serving} />
      <FoodGroupServingBadge foodGroup="fat" serving={serving} />
      <FoodGroupServingBadge foodGroup="sweet" serving={serving} />
    </span>
  );
}
