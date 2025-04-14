import DoneButton from "../../features/day-page/DoneButton";
import { VariantPrimary } from "../ButtonVariant";
import ReadOnlyViewButtons from "./ReadOnlyViewButtons";

const EditableViewButtons = () => (
  <DoneButton variant={VariantPrimary}>Done</DoneButton>
)

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
