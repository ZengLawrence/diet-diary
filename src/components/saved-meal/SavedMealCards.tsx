import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import MealCardHeader from "../../features/saved-meal/MealCardHeader";
import { Food } from "../../model/Food";
import { FoodListGroupItems } from "../meal-card/FoodListGroupItems";

interface Props {
  meals: { index: number; foods: Food[]; }[]
}

export const SavedMealCards = (props: Props) => (
  <div>
    {_.map(props.meals, m => (
      <Card className="mt-1" key={m.index} data-cy="mealCard">
        <MealCardHeader meal={m} />

        <ListGroup>
          <FoodListGroupItems mealIndex={m.index} foods={m.foods} />
        </ListGroup>
      </Card>
    ))}
  </div>
);
