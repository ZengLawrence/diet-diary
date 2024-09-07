import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Food } from "../model/Food";
import { FoodGroupServingBadgePanel } from "./panels/FoodGroupServingBadgePanel";

export const FoodItem = (props: { food: Food; }) => {
  const { description, serving } = props.food;
  return (
    <Row>
      <Col>{description}</Col>
      <Col xs="auto">
        <FoodGroupServingBadgePanel serving={serving}/>
      </Col>
    </Row>
  );
}
