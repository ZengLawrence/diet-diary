import { Card, ListGroup } from "react-bootstrap";
import { Meal } from "../../model/Food";
import { FoodItem } from "../FoodItem";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";

export const UneditableMealCard = (props: { meal: Meal; }) => {
  const { meal } = props;
  const { mealTime, foods } = meal;

  return (
    <Card className="mt-1">
      <Card.Header className="d-flex flex-wrap align-items-center">
        <div className="flex-fill">{mealTime}</div>
        <MealCalorieServingPanel meal={meal} />
      </Card.Header>

      <ListGroup>
        {foods.map((food, index) => <ListGroup.Item key={index}>
          <FoodItem food={food} />
        </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};
