import { Fragment, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Action, enterFoodEditModeAction, exitFoodEditModeAction } from "../../actions";
import { Food } from "../../model/Food";
import { EditModeButton } from "../EditModeButton";
import { FoodItem } from "../FoodItem";
import { MealDispatch } from "../MealDispatch";
import { UpdateFoodFormGroupItem } from "./UpdateFoodFormGroupItem";

export const FoodGroupItems = (props: { foods: Food[]; mealIndex: number; foodEditIndex?: number; editState?: string; }) => {
  const { foods, mealIndex, foodEditIndex, editState } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);

  const groupItems = foods.map((food, index) => {
    const toggleFoodEditMode = () => {
      index === foodEditIndex
        ? dispatch(exitFoodEditModeAction(mealIndex))
        : dispatch(enterFoodEditModeAction(mealIndex, index));
    };

    return (
      <Fragment key={index}>
        <ListGroup.Item className="d-flex align-items-center">
          <FoodItem food={food} />
          {editState === 'edit'
            && <EditModeButton editMode={index === foodEditIndex} onClick={toggleFoodEditMode} />}
        </ListGroup.Item>
        {editState === 'edit'
          && index === foodEditIndex
          &&
          <UpdateFoodFormGroupItem food={food} mealIndex={mealIndex} foodIndex={index} />}
      </Fragment>
    );
  });

  return (
    <Fragment>
      {groupItems}
    </Fragment>
  );
};
