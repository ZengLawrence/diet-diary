import _ from "lodash";
import { Fragment } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import FoodListGroupItems from "../../features/meal-card/FoodListGroupItems";
import MealCardHeader from "../../features/meal-card/MealCardHeader";

export const MealCards = (props: { numberOfMeals: number; }) => (
  <Fragment>
    {_.map(_.range(props.numberOfMeals), (index) => (
      <Card
        id={_.toString(index)}
        key={index}
        className="mb-1"
        data-cy="mealCard">
        <MealCardHeader mealIndex={index} />

        <ListGroup>
          <FoodListGroupItems mealIndex={index} />
        </ListGroup>
      </Card>
    ))}
  </Fragment>
);
