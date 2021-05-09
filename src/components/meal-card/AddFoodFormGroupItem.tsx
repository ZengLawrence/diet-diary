import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Action, addFoodAction, cancelAddFoodAction } from "../../actions";
import { Food, newFood } from "../../model/Food";
import { FoodInputForm } from "../input-form/FoodInputForm";
import { MealDispatch } from "../MealDispatch";

export const AddFoodFormGroupItem = (props: { mealIndex: number; }) => {
  const { mealIndex } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handlAddFood = (food: Food) => {
    dispatch(addFoodAction(mealIndex, food));
  };

  const handleCancelAddFood = () => {
    dispatch(cancelAddFoodAction(mealIndex));
  };

  return (
    <ListGroup.Item>
      <FoodInputForm food={newFood()} buttonLabel="Add" onAddFood={handlAddFood} onCancel={handleCancelAddFood} />
    </ListGroup.Item>
  );
};
