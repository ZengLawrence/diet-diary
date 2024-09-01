import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Food } from "../../model/Food";
import { VariantDanger, VariantSecondary } from "../ButtonVariant";

interface Props {
  mealIndex: number;
  meal: { foods: Food[]; };
  selectMeal: (mealIndex: number, meal: { foods: Food[]; }) => void;
  deleteMeal: (mealIndex: number) => void;
}

export const MealCardHeader = (props: Props) => (
  <Card.Header>
    <Row>
      <Col xs="auto">
        <Button variant={VariantDanger} onClick={() => props.deleteMeal(props.mealIndex)}>Delete</Button>
      </Col>
      <Col />
      <Col xs="auto">
        <Button variant={VariantSecondary} onClick={() => props.selectMeal(props.mealIndex, props.meal)}>Select</Button>
      </Col>
    </Row>
    <Row>
      <MealCalorieServingPanel meal={props.meal} />    
    </Row>
  </Card.Header>
)
