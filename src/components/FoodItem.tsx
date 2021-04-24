import { ListGroup } from "react-bootstrap";
import { Food } from "../model/Food";
import { FoodGroupServingBadge } from "./FoodGroupServingBadge";

export const FoodItem = (props: { food: Food; }) => {
  const { name, serving } = props.food;
  return (
    <ListGroup.Item className="d-flex">
      <div className="mr-auto">{name}</div>
      <div>
        <FoodGroupServingBadge foodGroup="vegetable" serving={serving} />
        <FoodGroupServingBadge foodGroup={"fruit"} serving={serving} />
        <FoodGroupServingBadge foodGroup={"carbohydrate"} serving={serving} />
        <FoodGroupServingBadge foodGroup={"protein"} serving={serving} />
        <FoodGroupServingBadge foodGroup={"fat"} serving={serving} />
        <FoodGroupServingBadge foodGroup={"sweeet"} serving={serving} />
      </div>
    </ListGroup.Item>
  );
}
