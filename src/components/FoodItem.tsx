import { Food } from "../model/Food";
import { FoodGroupServingBadgePanel } from "./panels/FoodGroupServingBadgePanel";

export const FoodItem = (props: { food: Food; }) => {
  const { description, serving } = props.food;
  return (
    <div className="d-flex flex-fill align-items-center">
      <div className="mr-auto">{description}</div>
      <FoodGroupServingBadgePanel serving={serving}/>
    </div>
  );
}
