import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import { MealState } from "../model/AppState";
import { FoodItem } from "./FoodItem";
import { ServingSummary } from "./ServingSummary";

export const MealCard = (props: { state: MealState }) => {
  const { meal } = props.state;
  const { mealTime, foods } = meal;
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