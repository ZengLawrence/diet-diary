import _ from "lodash";
import { Fragment, useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Action, deleteMealAction, enterFoodEditModeAction, enterMealEditModelAction, exitFoodEditModeAction, exitMealEditModeAction } from "../../actions";
import { MealState } from "../../model/AppState";
import { DeleteButton } from "../DeleteButton";
import { EditModeButton } from "../EditModeButton";
import { FoodItem } from "../FoodItem";
import { MealDispatch } from "../MealDispatch";
import { MealSummary } from "../MealSummary";
import { AddButtonGroupItem } from "./AddButtonGroupItem";
import { AddFoodFormGroupItem } from "./AddFoodFormGroupItem";
import { UpdateFoodFormGroupItem } from "./UpdateFoodFormGroupItem";

interface Props {
  state: MealState;
  mealIndex: number;
  editMode: boolean;
}

export const MealCard = (props: Props) => {
  const { state, mealIndex, editMode } = props;
  const { meal, editState, foodEditIndex } = state;
  const { mealTime, foods } = meal;

  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const deleteMeal = () => dispatch(deleteMealAction(mealIndex));
  const toggleMealEditMode = () => {
    editState === "edit"
      ? dispatch(exitMealEditModeAction(mealIndex))
      : dispatch(enterMealEditModelAction(mealIndex));
  }

  const foodItems = foods.map((food, index) => {
    const toggleFoodEditMode = () => {
      index === foodEditIndex
        ? dispatch(exitFoodEditModeAction(mealIndex))
        : dispatch(enterFoodEditModeAction(mealIndex, index));
    }
    return (
      <Fragment>
        <ListGroup.Item key={index} className="d-flex align-items-center">
          <FoodItem food={food} />
          {editState === 'edit'
            && <EditModeButton editMode={index === foodEditIndex} onClick={toggleFoodEditMode} />}
        </ListGroup.Item>
        {editState === 'edit'
          && index === foodEditIndex
          &&
          <UpdateFoodFormGroupItem food={food} mealIndex={mealIndex} foodIndex={index} />
        }
      </Fragment>
    )
  });

  return (
    <Card className="mt-1">
      <Card.Header className="d-flex align-items-center">
        <div className="mr-auto">{mealTime}</div>
        <MealSummary meal={meal} />
        {editMode &&
          !_.isUndefined(editState) &&
          <DeleteButton onClick={deleteMeal} />}
        {editMode &&
          <EditModeButton editMode={editState === "edit"} onClick={toggleMealEditMode} />}
      </Card.Header>

      <ListGroup>
        {foodItems}
        {editState === 'edit' && <AddButtonGroupItem mealIndex={mealIndex} />}
        {editState === 'add' && <AddFoodFormGroupItem mealIndex={mealIndex} />}
      </ListGroup>
    </Card>
  );
}