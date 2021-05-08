import { Food } from "../model/Food";
import { FoodGroupServingBadge } from "./FoodGroupBadge";

export const FoodItem = (props: { food: Food; }) => {
  const { name, serving } = props.food;
  return (
    <div className="d-flex">
      <div className="mr-auto">{name}</div>
      <div>
        <FoodGroupServingBadge foodGroup="vegetable" serving={serving} />
        <FoodGroupServingBadge foodGroup={"fruit"} serving={serving} />
        <FoodGroupServingBadge foodGroup={"carbohydrate"} serving={serving} />
        <FoodGroupServingBadge foodGroup={"protein"} serving={serving} />
        <FoodGroupServingBadge foodGroup={"fat"} serving={serving} />
        <FoodGroupServingBadge foodGroup={"sweet"} serving={serving} />
      </div>
    </div>
  );
}
