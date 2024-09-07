import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MealButtons from "../../features/meal-card/MealButtons";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Meal } from "../../model/Food";
import { VariantDanger } from "../ButtonVariant";
import Button from "react-bootstrap/Button";

interface Props {
  meal: Meal;
  mealIndex: number;
  showButton: boolean;
  showDeleteButton: boolean;
  showMealSavedAlert?: boolean;
  hideMealSavedAlert: () => void;
  deleteMeal: (mealIndex: number) => void;
}

export const MealCardHeader = (props: Props) => (
  <Card.Header>
    {props.showMealSavedAlert &&
      <Row>
        <Alert variant="success" onClose={props.hideMealSavedAlert} dismissible>
          Meal saved.
        </Alert>
      </Row>
    }
    <Row>
      {props.showDeleteButton &&
        <Col xs="auto">
          <Button variant={VariantDanger} onClick={() => props.deleteMeal(props.mealIndex)}>Delete</Button>
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
