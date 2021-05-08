import _ from "lodash";
import { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Action, addFoodAction, cancelAddFoodAction, deleteMealAction, enterFoodEditModeAction, enterMealAddModelAction, enterMealEditModelAction, exitFoodEditModeAction, exitMealEditModelAction } from "../actions";
import { MealState } from "../model/AppState";
import { Food } from "../model/Food";
import { AddButton } from "./AddButton";
import { DeleteButton } from "./DeleteButton";
import { EditModeButton } from "./EditModeButton";
import { FoodInputForm } from "./FoodInputForm";
import { FoodItem } from "./FoodItem";
import { MealDispatch } from "./MealDispatch";
import { MealSummary } from "./MealSummary";

const FoodInputFormItem = (props: { mealIndex: number }) => {
  const { mealIndex } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handlAddFood = (food: Food) => {
    dispatch(addFoodAction(mealIndex, food));
  }

  const handleCancelAddFood = () => {
    dispatch(cancelAddFoodAction(mealIndex));
  }

  return (
    <ListGroup.Item>
      <FoodInputForm onAddFood={handlAddFood} onCancel={handleCancelAddFood} />
    </ListGroup.Item>
  );
}

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
  const toggleMealEditMode = () => editState === "edit" ? dispatch(exitMealEditModelAction(mealIndex)) : dispatch(enterMealEditModelAction(mealIndex));
  const enterAddState = () => dispatch(enterMealAddModelAction(mealIndex));

  const foodItems = foods.map((food, index) => {
    const toggleFoodEditMode = () => index === foodEditIndex ? dispatch(exitFoodEditModeAction(mealIndex)) : dispatch(enterFoodEditModeAction(mealIndex, index));
    return (
      <ListGroup.Item key={index} className="d-flex align-items-center">
        <FoodItem food={food} />
        {editState === 'edit'
          && <EditModeButton editMode={index === foodEditIndex} onClick={toggleFoodEditMode} />}
      </ListGroup.Item>
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
        {editState === 'edit' && <AddButton onClick={enterAddState} />}
        {editState === 'add' && <FoodInputFormItem mealIndex={mealIndex} />}
      </ListGroup>
    </Card>
  );
}