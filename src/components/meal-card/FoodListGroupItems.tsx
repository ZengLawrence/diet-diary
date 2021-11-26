import _ from "lodash";
import { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import { MealEditState } from "../../features/day-page/mealStatesSlice";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import { Food } from "../../model/Food";
import { FoodItem } from "../FoodItem";

interface Props {
  editState: MealEditState;
  mealIndex: number;
  foods: Food[];
}

export const FoodListGroupItems = (props: Props) => {
  switch (props.editState) {
    case "add":
      return (
        <Fragment>
          {props.foods.map((food, index) => (
            <ListGroup.Item key={index}>
              <FoodItem food={food} />
            </ListGroup.Item>
          ))}
          <ListGroup.Item key={_.size(props.foods)}>
            <AddFoodInputForm mealIndex={props.mealIndex} />
          </ListGroup.Item>
        </Fragment>

      );

    default:
      return (
        <Fragment>
          {props.foods.map((food, index) => (
            <ListGroup.Item key={index}>
              <FoodItem food={food} />
            </ListGroup.Item>
          ))}
        </Fragment>
      );
  }
}
