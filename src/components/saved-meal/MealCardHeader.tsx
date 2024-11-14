import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Food } from "../../model/Food";
import { VariantDanger, VariantSecondary } from "../ButtonVariant";

interface Props {
  meal: { index: number; foods: Food[]; };
  selectMeal: (meal: { index: number; foods: Food[]; }) => void;
  deleteMeal: (meal: { index: number; foods: Food[]; }) => void;
}

export const MealCardHeader = (props: Props) => (
  <Card.Header>
    <Row>
      <Col xs="auto">
        <Button variant={VariantDanger} onClick={() => props.deleteMeal(props.meal)}>Delete</Button>
      </Col>
      <Col />
      <Col xs="auto">
        <Button variant={VariantSecondary} onClick={() => props.selectMeal(props.meal)}>Select</Button>
      </Col>
    </Row>
    <Row>
      <MealCalorieServingPanel meal={props.meal} />
    </Row>
  </Card.Header>
)
