import Card from "react-bootstrap/Card";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Food } from "../../model/Food";
import { VariantSecondary } from "../ButtonVariant";
import { SelectButton } from "./SelectButton";

interface Props {
  mealIndex: number;
  meal: {foods: Food[];};
}

export const MealCardHeader = (props: Props) => (
  <Card.Header className="d-flex justify-content-end">
    <MealCalorieServingPanel meal={props.meal} />
    <SelectButton variant={VariantSecondary} mealIndex={props.mealIndex} meal={props.meal}>Select</SelectButton>
  </Card.Header>
)
