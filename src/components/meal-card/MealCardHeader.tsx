import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MealButtons from "../../features/meal-card/MealButtons";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Meal } from "../../model/Food";

interface Props {
  meal: Meal;
  mealIndex: number;
  showButton: boolean;
}

export const MealCardHeader = (props: Props) => (
  <Card.Header>
    <Row>
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
