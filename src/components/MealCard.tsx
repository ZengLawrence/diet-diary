import _ from "lodash";
import { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Action, AddFoodAction, CancelAddFoodAction } from "../actions";
import { MealState } from "../model/AppState";
import { Food } from "../model/Food";
import { FoodInputForm } from "./FoodInputForm";
import { FoodItem } from "./FoodItem";
import { MealDispatch } from "./MealDispatch";
import { ServingSummary } from "./ServingSummary";

const FoodInputFormItem = (props: { mealIndex: number }) => {
  const { mealIndex } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handlAddFood = (food: Food) => {
    dispatch({
      type: "add-food",
      food,
      mealIndex,
    } as AddFoodAction)
  }

  const handleCancelAddFood = () => {
    dispatch({
      type: "cancel-add-food",
      mealIndex,
    } as CancelAddFoodAction)
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
  const servings = _.map(foods, "serving");


  return (
    <Card className="mt-1">
      <Card.Header>{mealTime}</Card.Header>
      <ListGroup>
        {foodItems}
        {editState === 'add' && <FoodInputFormItem mealIndex={mealIndex} />}
      </ListGroup>
      <Card.Footer className="d-flex justify-content-end" >
        <ServingSummary servings={servings} />
      </Card.Footer>
    </Card>
  );
}