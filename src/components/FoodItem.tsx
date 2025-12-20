import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import type { Food } from "../model/Food";
import { FoodGroupServingBadgePanel } from "./panels/FoodGroupServingBadgePanel";
import { BlueStar } from "./BlueStar";

export const FoodItem = (props: { food: Food; }) => {
  const { description, serving, bestChoice } = props.food;
  return (
    <Row>
      <Col>{bestChoice && <BlueStar />}{description}</Col>
      <Col xs="auto">
        <FoodGroupServingBadgePanel serving={serving}/>
      </Col>
    </Row>
  );
}
