import { Card, ListGroup } from "react-bootstrap";
import { Food } from "../model/Food";
import { FoodItem } from "./FoodItem";

interface Props {
  mealTime: string;
  foods: Food[];
}

export const MealCard = (props: Props) => {
  const { mealTime, foods } = props;
  const foodItems = foods.map((food, index) => <FoodItem key={index} food={food} />);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{mealTime}</Card.Title>
      </Card.Body>
      <ListGroup>
        {foodItems}
      </ListGroup>
    </Card>
  );
}