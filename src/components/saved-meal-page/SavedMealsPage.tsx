import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import SavedMealFoodListGroupItems from "../../features/save-meal/FoodListGroupItems";
import MealCardHeader from "../../features/save-meal/MealCardHeader";

interface Props {
  numberOfMeals: number;
}

export const SavedMealsPage = (props: Props) => (
  <div>
    {_.map(_.range(props.numberOfMeals), (index) => (
      <Card className="mt-1" key={index} data-cy="mealCard">
        <MealCardHeader mealIndex={index} />
  
        <ListGroup>
          <SavedMealFoodListGroupItems mealIndex={index} />
        </ListGroup>
      </Card>
    ))}
  </div>
);
