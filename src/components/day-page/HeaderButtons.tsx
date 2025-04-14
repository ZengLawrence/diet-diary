import { Fragment } from "react";
import { Button } from "react-bootstrap";
import DoneButton from "../../features/day-page/DoneButton";
import EditButton from "../../features/day-page/EditButton";
import { useDownload } from "../../features/download/useDownload";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";

const EditableViewButtons = () => (
  <DoneButton variant={VariantPrimary}>Done</DoneButton>
)

const ReadOnlyViewButtons = (props: { showDownloadButton: boolean; }) => {
  const handleClicked = useDownload();
  return (
    <Fragment>
      {props.showDownloadButton &&
        <Button variant={VariantSecondary} onClick={handleClicked}>Download</Button>
      }{' '}
      <EditButton variant={VariantPrimary}>Edit</EditButton>
    </Fragment>
  )
}

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
