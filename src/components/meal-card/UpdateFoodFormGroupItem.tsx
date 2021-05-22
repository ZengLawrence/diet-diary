import { ListGroup } from "react-bootstrap";
import { exitFoodEditModeAction, updateFoodAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";
import { Food } from "../../model/Food";
import { FoodInputForm } from "../input-form/FoodInputForm";

export const UpdateFoodFormGroupItem = (props: { food: Food; mealIndex: number; foodIndex: number; }) => {
  const { food, mealIndex, foodIndex } = props;
  const dispatch = useAppDispatch();
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
