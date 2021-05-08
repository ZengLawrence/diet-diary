import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Action, enterEditModeAction, exitEditModeAction } from "../actions";
import { MealDispatch } from "./MealDispatch";

export const EditModeButton = (props: { editMode: boolean; }) => {
  const { editMode } = props;
  const lable = editMode ? 'Done' : "Edit";
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handleClick = () => editMode ? dispatch(exitEditModeAction()) : dispatch(enterEditModeAction());
  return (
    <Button
      variant="outline-primary"
      onClick={handleClick}
    >
      {lable}
    </Button>
  );
};
