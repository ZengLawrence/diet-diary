import _ from "lodash";
import { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Action, addFoodAction, cancelAddFoodAction, deleteMealAction, enterMealEditModelAction, exitMealEditModelAction } from "../actions";
import { MealState } from "../model/AppState";
import { Food } from "../model/Food";
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

const FoodListGroupItem = (props: { food: Food, editMode: boolean }) => {
  return (
    <ListGroup.Item className="d-flex align-items-center">
      <FoodItem food={props.food} />
    </ListGroup.Item>
  )
}

export const MealCard = (props: Props) => {
  const { state, mealIndex, editMode } = props;
  const { meal, editState } = state;
  const { mealTime, foods } = meal;
  const foodItems = foods.map((food, index) => <FoodListGroupItem key={index} food={food} editMode={editMode && !_.isUndefined(editState)} />);

  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const deleteMeal = () => dispatch(deleteMealAction(mealIndex));
  const toggleMealEditMode = () => editState === "edit" ? dispatch(exitMealEditModelAction(mealIndex)) : dispatch(enterMealEditModelAction(mealIndex));

  return (
    <Card className="mt-1">
      <Card.Header className="d-flex align-items-center">
        {editMode && 
        !_.isUndefined(editState) &&
          <DeleteButton onClick={deleteMeal} />}
        <div className="mr-auto">{mealTime}</div>
        <MealSummary meal={meal} />
        {editMode &&
          <EditModeButton editMode={editState === "edit"} onClick={toggleMealEditMode} />}
      </Card.Header>
      <ListGroup>
        {foodItems}
        {editState === 'add' && <FoodInputFormItem mealIndex={mealIndex} />}
      </ListGroup>
    </Card>
  );
}