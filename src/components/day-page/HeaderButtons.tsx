import ReadOnlyViewButtons from "../../features/day-page/ReadOnlyViewButtons";
import EditableViewButtons from "./EditableViewButtons";

interface Props {
  editMode: boolean,
}

export const HeaderButtons = (props: Props) => {
  const { editMode } = props;
  return (
    <span>
      {editMode ?
        <EditableViewButtons />
        : <ReadOnlyViewButtons />}
    </span>
  )
}
