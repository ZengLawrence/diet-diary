import Card from "react-bootstrap/Card";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Food } from "../../model/Food";
import { VariantSecondary } from "../ButtonVariant";
import Button from "react-bootstrap/Button";

interface Props {
  mealIndex: number;
  meal: { foods: Food[]; };
  selectMeal: (mealIndex: number, meal: { foods: Food[]; }) => void;
}

export const MealCardHeader = (props: Props) => (
  <Card.Header className="d-flex justify-content-end">
    <MealCalorieServingPanel meal={props.meal} />
    <Button variant={VariantSecondary} onClick={() => props.selectMeal(props.mealIndex, props.meal)}>Select</Button>
  </Card.Header>
)
