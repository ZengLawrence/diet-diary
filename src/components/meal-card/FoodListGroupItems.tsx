import _ from "lodash";
import { Fragment } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import type { MealEditState } from "../../features/day-page/pageOptionsSlice";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import UpdateFoodInputForm from "../../features/input-form/UpdateFoodInputForm";
import EditFoodButton from "../../features/meal-card/EditFoodButton";
import NewFoodButton from "../../features/meal-card/NewFoodButton";
import type { Food } from "../../model/Food";
import { VariantPrimary } from "../ButtonVariant";
import { FoodItem } from "../FoodItem";

const EditableFoodItem = (props: {
  food: Food;
  mealIndex: number;
  foodIndex: number;
}) => (
  <Row>
    <Col>
      <FoodItem food={props.food} />
    </Col>
    <Col xs="auto">
      <EditFoodButton variant={VariantPrimary} mealIndex={props.mealIndex} foodIndex={props.foodIndex} label="Edit" />
    </Col>
  </Row>
);

interface Props {
  editState?: MealEditState;
  mealIndex: number;
  foods: Food[];
  foodEditIndex?: number;
}

export const FoodListGroupItems = (props: Props) => {
  switch (props.editState) {
    case "add":
      /* eslint-disable react-x/no-array-index-key */
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
    /* eslint-enable react-x/no-array-index-key */

    case "edit":
      /* eslint-disable react-x/no-array-index-key */
      return (
        <Fragment>
          {
            props.foods.map((food, index) => (
              <ListGroup.Item key={index} data-cy="foodItem">
                {index === props.foodEditIndex
                  ? <UpdateFoodInputForm food={food} mealIndex={props.mealIndex} foodIndex={index} />
                  : <EditableFoodItem food={food} mealIndex={props.mealIndex} foodIndex={index} />
                }
              </ListGroup.Item>
            ))
          }
          <ListGroup.Item>
            <NewFoodButton mealIndex={props.mealIndex} />
          </ListGroup.Item>
        </Fragment>
      );
    /* eslint-enable react-x/no-array-index-key */

    default:
      /* eslint-disable react-x/no-array-index-key */
      return (
        <Fragment>
          {props.foods.map((food, index) => (
            <ListGroup.Item key={index} data-cy="foodItem">
              <FoodItem food={food} />
            </ListGroup.Item>
          ))}
        </Fragment>
      );
    /* eslint-enable react-x/no-array-index-key */
  }
}
