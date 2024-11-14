import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import SavedMealFoodListGroupItems from "../../features/saved-meal/FoodListGroupItems";
import MealCardHeader from "../../features/saved-meal/MealCardHeader";
import { Food } from "../../model/Food";

interface Props {
  meals: { index: number; foods: Food[]; }[]
}

export const SavedMealCards = (props: Props) => (
  <div>
    {_.map(props.meals, m => (
      <Card className="mt-1" key={m.index} data-cy="mealCard">
        <MealCardHeader mealIndex={m.index} />

        <ListGroup>
          <SavedMealFoodListGroupItems mealIndex={m.index} />
        </ListGroup>
      </Card>
    ))}
  </div>
);
