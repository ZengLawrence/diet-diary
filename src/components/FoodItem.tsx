import { ListGroup } from "react-bootstrap";
import { Food } from "../model/Food";

export const FoodItem = (props: { food: Food; }) => {
  const { name, serving } = props.food;
  return (
    <ListGroup.Item className="d-flex">
      <div>{name}</div>
      <div className="text-white m-1" style={{ backgroundColor: "green" }}>{serving.vegetable}</div>
      <div className="text-white m-1" style={{ backgroundColor: "teal" }}>{serving.fruit}</div>
      <div className="text-white m-1" style={{ backgroundColor: "cyan" }}>{serving.carbohydrate}</div>
      <div className="text-white m-1" style={{ backgroundColor: "blue" }}>{serving.protein}</div>
      <div className="text-white m-1" style={{ backgroundColor: "orange" }}>{serving.fat}</div>
      <div className="text-white m-1" style={{ backgroundColor: "red" }}>{serving.sweeet}</div>
    </ListGroup.Item>
  );
}
