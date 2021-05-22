import { Food } from "../model/Food";
import { FoodGroupServingBadge } from "./badge";

export const FoodItem = (props: { food: Food; }) => {
  const { name, serving } = props.food;
  return (
    <div className="d-flex flex-fill">
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
