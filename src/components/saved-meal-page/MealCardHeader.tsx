import { Card } from "react-bootstrap";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Meal } from "../../model/Food";

interface Props {
  meal: Meal;
}

export const MealCardHeader = (props: Props) => (
  <Card.Header className="d-flex justify-content-end">
    <MealCalorieServingPanel meal={props.meal} />
  </Card.Header>
)
