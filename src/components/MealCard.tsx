import { useContext } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Action, addFoodAction, cancelAddFoodAction, deleteMealAction } from "../actions";
import { MealState } from "../model/AppState";
import { Food } from "../model/Food";
import { DeleteButton } from "./DeleteButton";
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

const EditButton = () => {
  return (
    <Button variant="outline-primary">Edit</Button>
  )
}

const FoodListGroupItem = (props: { food: Food, editMode: boolean }) => {
  const { food, editMode } = props;
  return (
    <ListGroup.Item className="d-flex align-items-center">
      <FoodItem food={food} />
      {editMode && <EditButton />}
    </ListGroup.Item>
  )
}

export const MealCard = (props: Props) => {
  const { state, mealIndex, editMode } = props;
  const { meal, editState } = state;
  const { mealTime, foods } = meal;
  const foodItems = foods.map((food, index) => <FoodListGroupItem key={index} food={food} editMode={editMode} />);

  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const deleteMeal = () => dispatch(deleteMealAction(mealIndex));

  return (
    <Card className="mt-1">
      <Card.Header className="d-flex align-items-center">
        {editMode &&
          <DeleteButton onClick={deleteMeal} />}
        <div className="mr-auto">{mealTime}</div>
        <MealSummary meal={meal} />
      </Card.Header>
      <ListGroup>
        {foodItems}
        {editState === 'add' && <FoodInputFormItem mealIndex={mealIndex} />}
      </ListGroup>
    </Card>
  );
}