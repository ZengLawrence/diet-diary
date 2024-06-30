import { Card } from "react-bootstrap";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Food } from "../../model/Food";

interface Props {
  meal: {foods: Food[];};
}

export const MealCardHeader = (props: Props) => (
  <Card.Header className="d-flex justify-content-end">
    <MealCalorieServingPanel meal={props.meal} />
  </Card.Header>
)
