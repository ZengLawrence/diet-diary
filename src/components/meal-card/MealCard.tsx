import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import { deleteMealAction, enterMealEditModelAction, exitMealEditModeAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";
import { MealState } from "../../model/AppState";
import { calcMealCalories } from "../../model/calorieFunction";
import { calcServingSummary } from "../../model/servingFunction";
import { DeleteButton } from "../DeleteButton";
import { EditModeButton } from "../EditModeButton";
import { FoodGroupServingBadgePanel } from "../FoodGroupServingBadgePanel";
import { AddButtonGroupItem } from "./AddButtonGroupItem";
import { AddFoodFormGroupItem } from "./AddFoodFormGroupItem";
import { FoodGroupItems } from "./FoodGroupItems";

interface Props {
  state: MealState;
  mealIndex: number;
  editMode: boolean;
}

export const MealCard = (props: Props) => {
  const { state, mealIndex, editMode } = props;
  const { meal, editState, foodEditIndex } = state;
  const { mealTime, foods } = meal;
  const totalCalories = calcMealCalories(meal);

  const dispatch = useAppDispatch();
  const deleteMeal = () => dispatch(deleteMealAction(mealIndex));
  const toggleMealEditMode = () => {
    editState === "edit"
      ? dispatch(exitMealEditModeAction(mealIndex))
      : dispatch(enterMealEditModelAction(mealIndex));
  }

  const deletButton = editMode &&
    !_.isUndefined(editState) &&
    <DeleteButton onClick={deleteMeal} />;

  const editModeButton = editMode &&
    <EditModeButton editMode={editState === "edit"} onClick={toggleMealEditMode} />;

  return (
    <Card className="mt-1">
      <Card.Header className="d-flex flex-wrap align-items-center">
        <div className="flex-fill order-sm-0">{mealTime}</div>
        <div className="order-sm-2">
          {deletButton}
          {editModeButton}
        </div>
        <div className="d-flex justify-content-between align-items-center order-sm-1">
          <div className="mr-1">{totalCalories}{' '}Cal.</div>
          <FoodGroupServingBadgePanel serving={calcServingSummary(meal)} />
        </div>
      </Card.Header>

      <ListGroup>
        <FoodGroupItems foods={foods} mealIndex={mealIndex} foodEditIndex={foodEditIndex} editState={editState} />
        {editState === 'edit' && <AddButtonGroupItem mealIndex={mealIndex} />}
        {editState === 'add' && <AddFoodFormGroupItem mealIndex={mealIndex} />}
      </ListGroup>
    </Card>
  );
}