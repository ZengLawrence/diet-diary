import { Card } from "react-bootstrap";
import DeleteButton from "../../features/meal-card/DeleteButton";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import { MealEditState } from "../../model/AppState";
import { Meal } from "../../model/Food";
import { MealCalorieServingPanel } from "./MealCalorieServingPanel";

const DefaultMealCardHeader = (props: {
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

const AddMealCardHeader = (props: {
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

const EditMealCardHeader = (props: {
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

export const MealCardHeader = (props: {
  meal: Meal;
  editState: MealEditState;
  mealIndex: number;
}) => {
  switch (props.editState) {
    case "edit":
      return <EditMealCardHeader meal={props.meal} mealIndex={props.mealIndex} />;
    case "add":
      return <AddMealCardHeader meal={props.meal} mealIndex={props.mealIndex} />;
    default:
      return <DefaultMealCardHeader meal={props.meal} mealIndex={props.mealIndex} />;
  }
};
