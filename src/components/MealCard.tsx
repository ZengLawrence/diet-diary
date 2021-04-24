import { Card, ListGroup } from "react-bootstrap";
import { Food } from "../model/Food";
import { FoodItem } from "./FoodItem";

interface Props {
  mealTime: string;
  food: Food;
}

export const MealCard = (props: Props) => {
  const { mealTime, food } = props;
  return (
    <Card>
      <Card.Body>
        <Card.Title>{mealTime}</Card.Title>
      </Card.Body>
      <ListGroup>
        <FoodItem food={food} />
      </ListGroup>
    </Card>
  );
}