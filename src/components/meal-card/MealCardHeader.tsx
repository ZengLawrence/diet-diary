import _ from "lodash";
import { Card } from "react-bootstrap";
import DeleteButton from "../../features/meal-card/DeleteButton";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import NameButton from "../../features/meal-card/NameButton";
import { Meal } from "../../model/Food";

export const DefaultMealCardHeader = (props: {
  meal: Meal;
  mealIndex: number;
}) => (
  <Card.Header className="d-flex flex-wrap align-items-center">
    <div className="flex-fill order-sm-0">{props.meal.mealTime}</div>
    <div className="order-sm-2">
      {_.size(props.meal.foods) > 1 && <NameButton mealIndex={props.mealIndex} />}&nbsp;
      <EditButton mealIndex={props.mealIndex} />
    </div>
    <div className="order-sm-1 flex-grow-1 flex-md-grow-0">
      <MealCalorieServingPanel meal={props.meal} />
    </div>
  </Card.Header>
)

export const AddMealCardHeader = (props: {
  meal: Meal;
  mealIndex: number;
}) => (
  <Card.Header className="d-flex flex-wrap align-items-center">
    <div className="flex-fill order-sm-0">{props.meal.mealTime}</div>
    <div className="order-sm-2">
      <DeleteButton mealIndex={props.mealIndex} />&nbsp;
      <EditButton mealIndex={props.mealIndex} />
    </div>
    <div className="order-sm-1 flex-grow-1 flex-md-grow-0">
      <MealCalorieServingPanel meal={props.meal} />
    </div>
  </Card.Header>
)

export const EditMealCardHeader = (props: {
  meal: Meal;
  mealIndex: number;
}) => (
  <Card.Header className="d-flex flex-wrap align-items-center">
    <div className="flex-fill order-sm-0">{props.meal.mealTime}</div>
    <div className="order-sm-2">
      <DeleteButton mealIndex={props.mealIndex} />&nbsp;
      <DoneButton mealIndex={props.mealIndex} />
    </div>
    <div className="order-sm-1 flex-grow-1 flex-md-grow-0">
      <MealCalorieServingPanel meal={props.meal} />
    </div>
  </Card.Header>
)

export const NameMealCardHeader = (props: {
  meal: Meal;
  mealIndex: number;
}) => (
  <Card.Header className="d-flex flex-wrap align-items-center">
    <div className="flex-fill order-sm-0">{props.meal.mealTime}</div>
    <div className="order-sm-2">
      <EditButton mealIndex={props.mealIndex} />
    </div>
    <div className="order-sm-1 flex-grow-1 flex-md-grow-0">
      <MealCalorieServingPanel meal={props.meal} />
    </div>
  </Card.Header>
)