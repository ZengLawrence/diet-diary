import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Action, enterMealAddModeAction } from "../../actions";
import { AddButton } from "../AddButton";
import { MealDispatch } from "../MealDispatch";

export const AddButtonGroupItem = (props: { mealIndex: number; }) => {
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const enterAddState = () => dispatch(enterMealAddModeAction(props.mealIndex));
  return (
    <ListGroup.Item>
      <AddButton onClick={enterAddState} />
    </ListGroup.Item>
  );
};
