import EditableViewButtons from "./EditableViewButtons";
import ReadOnlyViewButtons from "./ReadOnlyViewButtons";

interface Props {
  editMode: boolean,
  showDownloadButton: boolean,
}

export const HeaderButtons = (props: Props) => {
  const { editMode, showDownloadButton } = props;
  return (
    <span>
      {editMode ?
        <EditableViewButtons />
        : <ReadOnlyViewButtons showDownloadButton={showDownloadButton} />}
    </span>
  )
}
