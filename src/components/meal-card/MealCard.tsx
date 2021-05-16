import _ from "lodash";
import { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Action, deleteMealAction, enterMealEditModelAction, exitMealEditModeAction } from "../../actions";
import { MealState } from "../../model/AppState";
import { DeleteButton } from "../DeleteButton";
import { EditModeButton } from "../EditModeButton";
import { MealDispatch } from "../MealDispatch";
import { AddButtonGroupItem } from "./AddButtonGroupItem";
import { AddFoodFormGroupItem } from "./AddFoodFormGroupItem";
import { FoodGroupItems } from "./FoodGroupItems";
import { FoodGroupServingBadgePanel } from "../FoodGroupServingBadgePanel";
import { calcServingSummary } from "../../model/servingFunction";
import { calcMealCalories } from "../../model/calorieFunction";

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

  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const deleteMeal = () => dispatch(deleteMealAction(mealIndex));
  const toggleMealEditMode = () => {
    editState === "edit"
      ? dispatch(exitMealEditModeAction(mealIndex))
      : dispatch(enterMealEditModelAction(mealIndex));
  }

  return (
    <Card className="mt-1">
      <Card.Header className="d-flex align-items-center">
        <div className="mr-auto">{mealTime}</div>
        <div>{totalCalories}{' '}Cal.</div>
        <FoodGroupServingBadgePanel serving={calcServingSummary(meal)} />
        {editMode &&
          !_.isUndefined(editState) &&
          <DeleteButton onClick={deleteMeal} />}
        {editMode &&
          <EditModeButton editMode={editState === "edit"} onClick={toggleMealEditMode} />}
      </Card.Header>

      <ListGroup>
        <FoodGroupItems foods={foods} mealIndex={mealIndex} foodEditIndex={foodEditIndex} editState={editState} />
        {editState === 'edit' && <AddButtonGroupItem mealIndex={mealIndex} />}
        {editState === 'add' && <AddFoodFormGroupItem mealIndex={mealIndex} />}
      </ListGroup>
    </Card>
  );
}