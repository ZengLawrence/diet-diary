import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import { FoodListGroupItems } from "../meal-card/FoodListGroupItems";
import { MealCardHeader } from "./MealCardHeader";
import type { SavedMeal } from "../../model/SavedMeal";

interface Props {
  meals: SavedMeal[];
  selectMeal: (meal: SavedMeal) => void;
  deleteMeal: (meal: SavedMeal) => void;
}

export const SavedMealCards = (props: Props) => {
  return (
    <div>
      {_.map(props.meals, (m, index) => (
        <Card className="mt-1" key={index} data-cy="mealCard">
          <MealCardHeader meal={m} selectMeal={props.selectMeal} deleteMeal={props.deleteMeal} />

          <ListGroup>
            <FoodListGroupItems mealIndex={index} foods={m.foods} />
          </ListGroup>
        </Card>
      ))}
    </div>
  );
}
