import { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import { enterFoodEditModeAction, exitFoodEditModeAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";
import UpdateFoodInputForm from "../../features/input-form/UpdateFoodInputForm";
import { Food } from "../../model/Food";
import { EditModeButton } from "../EditModeButton";
import { FoodItem } from "../FoodItem";

export const FoodGroupItems = (props: { foods: Food[]; mealIndex: number; foodEditIndex?: number; editState?: string; }) => {
  const { foods, mealIndex, foodEditIndex, editState } = props;
  const dispatch = useAppDispatch();

  const groupItems = foods.map((food, index) => {
    const toggleFoodEditMode = () => {
      index === foodEditIndex
        ? dispatch(exitFoodEditModeAction(mealIndex))
        : dispatch(enterFoodEditModeAction(mealIndex, index));
    };

    const showForm = (editState === 'edit' && index === foodEditIndex);
    const foodReadOnlyGroupItem = (
      <div className="d-flex align-items-center">
        <FoodItem food={food} />
        {editState === 'edit'
          && <EditModeButton editMode={index === foodEditIndex} onClick={toggleFoodEditMode} />}
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
