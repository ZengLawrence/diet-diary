import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MealButtons from "../../features/meal-card/MealButtons";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Meal } from "../../model/Food";
import { VariantDanger } from "../ButtonVariant";
import DeleteButton from "../../features/meal-card/DeleteButton";
import Alert from "react-bootstrap/Alert";

interface Props {
  meal: Meal;
  mealIndex: number;
  showButton: boolean;
  showDeleteButton: boolean;
}

export const MealCardHeader = (props: Props) => (
  <Card.Header>
    <Row>
      <Alert variant="success">
        Meal saved.
      </Alert>
    </Row>
    <Row>
      {props.showDeleteButton &&
        <Col xs="auto">
          <DeleteButton variant={VariantDanger} mealIndex={props.mealIndex} label="Delete" />
        </Col>
      }
      <Col>
        {props.meal.mealTime}
      </Col>
      {props.showButton &&
        <Col xs="auto">
          <MealButtons mealIndex={props.mealIndex} />
        </Col>
      }
    </Row>
    <Row>
      <MealCalorieServingPanel meal={props.meal} />
    </Row>
  </Card.Header>
)
