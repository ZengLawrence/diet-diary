import { useContext } from "react";
import { Action, enterEditModeAction, exitEditModeAction } from "../../actions";
import { EditModeButton } from "../EditModeButton";
import { MealDispatch } from "../MealDispatch";

export const DayEditModeButton = (props: { editMode: boolean; }) => {
  const { editMode } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handleClick = () => editMode ? dispatch(exitEditModeAction()) : dispatch(enterEditModeAction());

  return (
    <EditModeButton editMode={editMode} onClick={handleClick} />
  );
};
