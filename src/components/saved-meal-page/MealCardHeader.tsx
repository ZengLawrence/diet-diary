import { Card } from "react-bootstrap";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Meal } from "../../model/Food";

interface Props {
  meal: Meal;
}

export const MealCardHeader = (props: Props) => (
  <Card.Header className="d-flex flex-wrap align-items-center">
    <div className="order-sm-1 flex-grow-1 flex-md-grow-0">
      <MealCalorieServingPanel meal={props.meal} />
    </div>
  </Card.Header>
)
