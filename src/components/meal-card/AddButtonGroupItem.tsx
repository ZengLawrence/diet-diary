import { ListGroup } from "react-bootstrap";
import { enterMealAddModeAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";
import { AddButton } from "../AddButton";

export const AddButtonGroupItem = (props: { mealIndex: number; }) => {
  const dispatch = useAppDispatch();
  const enterAddState = () => dispatch(enterMealAddModeAction(props.mealIndex));
  return (
    <ListGroup.Item>
      <AddButton onClick={enterAddState} />
    </ListGroup.Item>
  );
};
