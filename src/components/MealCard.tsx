import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import { Meal } from "../model/Food";
import { ServingSummary } from "./ServingSummary";
import { FoodItem } from "./FoodItem";

export const MealCard = (props: { meal: Meal }) => {
  const { mealTime, foods } = props.meal;
  const foodItems = foods.map((food, index) => <FoodItem key={index} food={food} />);
  const servings = _.map(foods, "serving");
  return (
    <Card className="mt-1">
      <Card.Header>{mealTime}</Card.Header>
      <ListGroup>
        {foodItems}
      </ListGroup>
      <Card.Footer className="d-flex justify-content-end" >
        <ServingSummary servings={servings} />
      </Card.Footer>
    </Card>
  );
}