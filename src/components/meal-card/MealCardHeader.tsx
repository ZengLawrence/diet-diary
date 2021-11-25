import { Card } from "react-bootstrap";
import MealButtons from "../../features/meal-card/MealButtons";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Meal } from "../../model/Food";

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

export const AddMealCardHeader = DefaultMealCardHeader;

export const EditMealCardHeader = DefaultMealCardHeader;

export const NameMealCardHeader = DefaultMealCardHeader;