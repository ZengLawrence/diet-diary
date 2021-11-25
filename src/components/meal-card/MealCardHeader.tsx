import { Card } from "react-bootstrap";
import DeleteButton from "../../features/meal-card/DeleteButton";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import MealButtons from "../../features/meal-card/MealButtons";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Meal } from "../../model/Food";
import { VariantDanger, VariantPrimary } from "../ButtonVariant";

export const DefaultMealCardHeader = (props: {
  meal: Meal;
  mealIndex: number;
}) => (
  <Card.Header className="d-flex flex-wrap align-items-center">
    <div className="flex-fill order-sm-0">{props.meal.mealTime}</div>
    <div className="order-sm-2">
      <MealButtons mealIndex={props.mealIndex} />
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
      <MealButtons mealIndex={props.mealIndex} />
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
      <DeleteButton variant={VariantDanger} mealIndex={props.mealIndex}>Delete</DeleteButton>&nbsp;
      <DoneButton variant={VariantPrimary} mealIndex={props.mealIndex}>Done</DoneButton>
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
      <EditButton variant={VariantPrimary} mealIndex={props.mealIndex}>Edit</EditButton>
    </div>
    <div className="order-sm-1 flex-grow-1 flex-md-grow-0">
      <MealCalorieServingPanel meal={props.meal} />
    </div>
  </Card.Header>
)