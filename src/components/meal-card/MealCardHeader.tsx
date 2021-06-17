import _ from "lodash";
import { Card } from "react-bootstrap";
import DeleteButton from "../../features/meal-card/DeleteButton";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import { MealEditState } from "../../model/AppState";
import { calcMealCalories, displayCalorieValue } from "../../model/calorieFunction";
import { Meal } from "../../model/Food";
import { calcServingSummary } from "../../model/servingFunction";
import { FoodGroupServingBadgePanel } from "../badge/FoodGroupServingBadgePanel";

export const MealCardHeader = (props: { meal: Meal; editState: MealEditState; mealIndex: number; editMode: boolean; }) => {
  const { meal, editState, mealIndex, editMode } = props;
  const { mealTime } = meal;
  const totalCalories = calcMealCalories(meal);

  const deleteButton = editMode &&
    !_.isUndefined(editState) &&
    <DeleteButton mealIndex={mealIndex} />;

  const editModeButton = editMode &&
    (editState === "edit" ? <DoneButton mealIndex={mealIndex} /> : <EditButton mealIndex={mealIndex} />);

  return (
    <Card.Header className="d-flex flex-wrap align-items-center">
      <div className="flex-fill order-sm-0">{mealTime}</div>
      <div className="order-sm-2">
        {deleteButton}&nbsp;
        {editModeButton}
      </div>
      <div className="d-flex justify-content-between align-items-center order-sm-1 flex-grow-1 flex-md-grow-0">
        <div className="mr-1">{displayCalorieValue(totalCalories)}{' '}Cal.</div>
        <FoodGroupServingBadgePanel serving={calcServingSummary(meal)} />
      </div>
    </Card.Header>
  );
};
