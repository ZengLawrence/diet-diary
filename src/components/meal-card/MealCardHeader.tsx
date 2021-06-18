import _ from "lodash";
import { Card } from "react-bootstrap";
import DeleteButton from "../../features/meal-card/DeleteButton";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import { MealEditState } from "../../model/AppState";
import { Meal } from "../../model/Food";
import { MealCalorieServingPanel } from "./MealCalorieServingPanel";

interface Props {
  mealTime: string;
  meal: Meal;
  editState: MealEditState;
  mealIndex: number;
  editMode: boolean;
}

export const MealCardHeader = (props: Props) => {
  const { mealTime, meal, editState, mealIndex, editMode } = props;

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
      <div className="order-sm-1 flex-grow-1 flex-md-grow-0">
        <MealCalorieServingPanel meal={meal} />
      </div>
    </Card.Header>
  );
};
