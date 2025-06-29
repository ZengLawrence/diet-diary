import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { VariantDanger, VariantSecondary } from "../ButtonVariant";
import { SavedMeal } from "../../model/SavedMeal";

interface Props {
  meal: SavedMeal;
  selectMeal: (meal: SavedMeal) => void;
  deleteMeal: (meal: SavedMeal) => void;
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
