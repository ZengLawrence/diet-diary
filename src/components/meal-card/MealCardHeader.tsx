import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MealButtons from "../../features/meal-card/MealButtons";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import CaloriesExceedWarningAlert from "../../features/warning/CaloriesExceedWarningAlert";
import { Meal } from "../../model/Food";
import { VariantDanger } from "../ButtonVariant";
import CaloriesExceedAlertText from "../../features/warning/CaloriesExceedAlertText";

interface Props {
  meal: Meal;
  mealIndex: number;
  showButton: boolean;
  showDeleteButton: boolean;
  showMealSavedAlert?: boolean;
  showWarningAlert?: boolean;
  hideMealSavedAlert: () => void;
  deleteMeal: (mealIndex: number) => void;
  editMeal: (mealIndex: number) => void;
  saveMeal: (mealIndex: number, meal: Meal) => void;
  doneEdit: () => void;
}

const WarningAlertRow = () => (
  <Row>
    <CaloriesExceedWarningAlert>
      <CaloriesExceedAlertText />
    </CaloriesExceedWarningAlert>
  </Row>
)

export const MealCardHeader = (props: Props) => {

  const mealSavedAlertRow = (
    <Row>
      <Alert
        variant="success"
        onClose={props.hideMealSavedAlert}
        dismissible>
        Meal saved.
      </Alert>
    </Row>
  );

  const deleteButtonCol = (
    <Col xs="auto">
      <Button
        variant={VariantDanger}
        onClick={() => props.deleteMeal(props.mealIndex)}>
        Delete
      </Button>
    </Col>
  );

  const mealButtonsCol = (
    <Col xs="auto">
      <MealButtons
        mealIndex={props.mealIndex}
        editMeal={() => props.editMeal(props.mealIndex)}
        saveMeal={() => props.saveMeal(props.mealIndex, props.meal)}
        doneEdit={() => props.doneEdit()}
      />
    </Col>
  );

  return (
    <Card.Header>
      {props.showMealSavedAlert && mealSavedAlertRow}
      {props.showWarningAlert && <WarningAlertRow />}
      <Row>
        {props.showDeleteButton && deleteButtonCol}
        <Col>{props.meal.mealTime}</Col>
        {props.showButton && mealButtonsCol}
      </Row>
      <Row>
        <MealCalorieServingPanel meal={props.meal} />
      </Row>
    </Card.Header>
  );
}
