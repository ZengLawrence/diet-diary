import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import SavedMealFoodListGroupItems from "../../features/save-meal/FoodListGroupItems";

interface Props {
  numberOfMeals: number;
}

export const SavedMealsPage = (props: Props) => (
  <div>
    {_.map(_.range(props.numberOfMeals), (index) => (
      <Card className="mt-1" key={index} data-cy="mealCard">
  
        <ListGroup>
          <SavedMealFoodListGroupItems mealIndex={index} />
        </ListGroup>
      </Card>
    ))}
  </div>
);
