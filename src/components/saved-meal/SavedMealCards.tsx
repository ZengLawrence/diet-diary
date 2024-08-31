import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import SavedMealFoodListGroupItems from "../../features/saved-meal/FoodListGroupItems";
import MealCardHeader from "../../features/saved-meal/MealCardHeader";

interface Props {
  numberOfMeals: number;
}

export const SavedMealCards = (props: Props) => (
  <div>
    {_.map(_.range(props.numberOfMeals), (index) => (
      <Card className="mt-1" key={index} data-cy="mealCard">
        <MealCardHeader mealIndex={index}/>
  
        <ListGroup>
          <SavedMealFoodListGroupItems mealIndex={index} />
        </ListGroup>
      </Card>
    ))}
  </div>
);
