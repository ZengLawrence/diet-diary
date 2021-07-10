import { Food } from "../model/Food";
import { FoodGroupServingBadgePanel } from "./panels/FoodGroupServingBadgePanel";

export const FoodItem = (props: { food: Food; }) => {
  const { name, serving } = props.food;
  return (
    <div className="d-flex flex-fill align-items-center">
      <div className="mr-auto">{name}</div>
      <FoodGroupServingBadgePanel serving={serving}/>
    </div>
  );
}
