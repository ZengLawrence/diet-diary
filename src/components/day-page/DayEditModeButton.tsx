import { enterEditModeAction, exitEditModeAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";
import { EditModeButton } from "../EditModeButton";

export const DayEditModeButton = (props: { editMode: boolean; }) => {
  const { editMode } = props;
  const dispatch = useAppDispatch();
  const handleClick = () => editMode ? dispatch(exitEditModeAction()) : dispatch(enterEditModeAction());

  return (
    <EditModeButton editMode={editMode} onClick={handleClick} />
  );
};
