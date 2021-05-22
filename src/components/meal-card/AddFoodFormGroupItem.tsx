import { ListGroup } from "react-bootstrap";
import { addFoodAction, cancelAddFoodAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";
import { Food, newFood } from "../../model/Food";
import { FoodInputForm } from "../input-form/FoodInputForm";

export const AddFoodFormGroupItem = (props: { mealIndex: number; }) => {
  const { mealIndex } = props;
  const dispatch = useAppDispatch();
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
