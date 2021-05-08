import { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Action, addFoodAction, cancelAddFoodAction } from "../actions";
import { MealState } from "../model/AppState";
import { Food } from "../model/Food";
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

export const MealCard = (props: { state: MealState; mealIndex: number }) => {
  const { state, mealIndex } = props;
  const { meal, editState } = state;
  const { mealTime, foods } = meal;
  const foodItems = foods.map((food, index) => <FoodItem key={index} food={food} />);

  return (
    <Card className="mt-1">
      <Card.Header className="d-flex">
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