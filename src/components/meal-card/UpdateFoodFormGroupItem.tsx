import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Action, exitFoodEditModeAction, updateFoodAction } from "../../actions";
import { Food } from "../../model/Food";
import { FoodInputForm } from "../FoodInputForm";
import { MealDispatch } from "../MealDispatch";

export const UpdateFoodFormGroupItem = (props: { food: Food; mealIndex: number; foodIndex: number; }) => {
  const { food, mealIndex, foodIndex } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handlUpdateFood = (food: Food) => {
    dispatch(updateFoodAction(mealIndex, foodIndex, food));
    dispatch(exitFoodEditModeAction(mealIndex));
  };

  const handleCancelAddFood = () => {
    dispatch(exitFoodEditModeAction(mealIndex));
  };

  return (
    <ListGroup.Item>
      <FoodInputForm food={food} buttonLabel="Update" onAddFood={handlUpdateFood} onCancel={handleCancelAddFood} />
    </ListGroup.Item>
  );
};
