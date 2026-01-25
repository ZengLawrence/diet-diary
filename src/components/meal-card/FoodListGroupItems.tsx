import _ from "lodash";
import { Fragment } from "react";
import { Save2 } from "react-bootstrap-icons";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { isFeatureFlagEnabled } from "../../features";
import type { MealEditState } from "../../features/day-page/pageOptionsSlice";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import UpdateFoodInputForm from "../../features/input-form/UpdateFoodInputForm";
import EditFoodButton from "../../features/meal-card/EditFoodButton";
import NewFoodButton from "../../features/meal-card/NewFoodButton";
import SaveFoodButton from "../../features/meal-card/SaveFoodButton";
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

const ReviewFoodItem = (props: {
  food: Food;
  mealIndex: number;
  foodIndex: number;
  isSaved?: boolean;
}) => (
  <Row>
    <Col>
      <FoodItem food={props.food} />
    </Col>
    <Col xs="auto">
      {props.isSaved
        ? <Save2 size={24} className="dd-fill-success" />
        : <SaveFoodButton
          variant={VariantPrimary}
          mealIndex={props.mealIndex}
          foodIndex={props.foodIndex}
          label="Save" />}
    </Col>
  </Row>
);

function isSaved(savedFoodIndexes: number[] | undefined, index: number): boolean {
  if (!savedFoodIndexes) {
    return false;
  }
  return savedFoodIndexes.includes(index);
}
interface Props {
  editState?: MealEditState;
  mealIndex: number;
  foods: Food[];
  foodEditIndex?: number;
  savedFoodsIndexes?: number[];
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

    case "review": {
      const isSavedFoodEnabled = isFeatureFlagEnabled("savedFoodEnabled");
      /* eslint-disable react-x/no-array-index-key */
      return (
        <Fragment>
          {props.foods.map((food, index) => (
            <ListGroup.Item key={index} data-cy="foodItem">
              {isSavedFoodEnabled
                ? <ReviewFoodItem
                  food={food}
                  mealIndex={props.mealIndex}
                  foodIndex={index}
                  isSaved={isSaved(props.savedFoodsIndexes, index)}
                />
                : <FoodItem food={food} />
              }
            </ListGroup.Item>
          ))}
        </Fragment>
      );
      /* eslint-enable react-x/no-array-index-key */
    }
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
