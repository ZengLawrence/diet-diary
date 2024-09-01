import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Food } from "../../model/Food";
import { VariantSecondary } from "../ButtonVariant";

interface Props {
  mealIndex: number;
  meal: { foods: Food[]; };
  selectMeal: (mealIndex: number, meal: { foods: Food[]; }) => void;
}

export const MealCardHeader = (props: Props) => (
  <Card.Header>
    <Row>
      <Button variant={VariantSecondary} onClick={() => props.selectMeal(props.mealIndex, props.meal)}>Select</Button>
    </Row>
    <Row>
      <MealCalorieServingPanel meal={props.meal} />    
    </Row>
  </Card.Header>
)
