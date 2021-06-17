import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import AddFoodInputForm from "../../features/input-form/AddFoodInputForm";
import DeleteButton from "../../features/meal-card/DeleteButton";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import NewFoodButton from "../../features/meal-card/NewFoodButton";
import { MealState } from "../../model/AppState";
import { calcMealCalories, displayCalorieValue } from "../../model/calorieFunction";
import { calcServingSummary } from "../../model/servingFunction";
import { FoodGroupServingBadgePanel } from "../badge/FoodGroupServingBadgePanel";
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

  const deleteButton = editMode &&
    !_.isUndefined(editState) &&
    <DeleteButton mealIndex={mealIndex} />;

  const editModeButton = editMode &&
    (editState === "edit" ? <DoneButton mealIndex={mealIndex} /> : <EditButton mealIndex={mealIndex} />);

  return (
    <Card className="mt-1">
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

      <ListGroup>
        <FoodGroupItems foods={foods} mealIndex={mealIndex} foodEditIndex={foodEditIndex} editState={editState} />
        {editState === 'edit' &&
          <ListGroup.Item>
            <NewFoodButton mealIndex={mealIndex} />
          </ListGroup.Item>
        }
        {editState === 'add' &&
          <ListGroup.Item key={_.size(foods)}>
            <AddFoodInputForm mealIndex={mealIndex} />
          </ListGroup.Item>
        }
      </ListGroup>
    </Card >
  );
}