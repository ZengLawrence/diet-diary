import _ from "lodash";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import FoodListGroupItems from "../../features/meal-card/FoodListGroupItems";
import MealCardHeader from "../../features/meal-card/MealCardHeader";

export const MealCards = (props: { numberOfMeals: number; }) => (
  _.map(_.range(props.numberOfMeals), (index) => (
    <div className="mb-1">
      <Card
        id={_.toString(index)}
        key={index}
        data-cy="mealCard">
        <MealCardHeader mealIndex={index} />

        <ListGroup>
          <FoodListGroupItems mealIndex={index} />
        </ListGroup>
      </Card>
    </div>
  ))
);
