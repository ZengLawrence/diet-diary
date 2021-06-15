import { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import UpdateFoodInputForm from "../../features/input-form/UpdateFoodInputForm";
import DoneButton from "../../features/meal-card/DoneButton";
import EditButton from "../../features/meal-card/EditButton";
import { Food } from "../../model/Food";
import { FoodItem } from "../FoodItem";

export const FoodGroupItems = (props: { foods: Food[]; mealIndex: number; foodEditIndex?: number; editState?: string; }) => {
  const { foods, mealIndex, foodEditIndex, editState } = props;
  const dispatch = useAppDispatch();

  const groupItems = foods.map((food, index) => {

    const showForm = (editState === 'edit' && index === foodEditIndex);
    const foodReadOnlyGroupItem = (
      <div className="d-flex align-items-center">
        <FoodItem food={food} />
        {editState === 'edit'
          && (index === foodEditIndex ? <DoneButton mealIndex={mealIndex} /> : <EditButton mealIndex={mealIndex} foodIndex={index} />)}
      </div>
    );

    return (
      <ListGroup.Item key={index}>
        {showForm
          ? <UpdateFoodInputForm food={food} mealIndex={mealIndex} foodIndex={index} />
          : foodReadOnlyGroupItem
        }
      </ListGroup.Item>
    );
  });

  return (
    <Fragment>
      {groupItems}
    </Fragment>
  );
};
