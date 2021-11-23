import { Fragment } from "react";
import { Button } from "react-bootstrap";
import DoneButton from "../../features/day-page/DoneButton";
import EditButton from "../../features/day-page/EditButton";
import NewDayButton from "../../features/day-page/NewDayButton";
import { useDownload } from "../../features/download/useDownload";
import { VariantDanger, VariantPrimary, VariantSecondary } from "../buttons/ButtonVariant";

const EditableViewButtons = () => (
  <Fragment>
    <NewDayButton variant={VariantDanger}>New Day</NewDayButton>{' '}
    <DoneButton variant={VariantPrimary}>Done</DoneButton>
  </Fragment>
)

const UneditableViewButtons = (props: { showDownloadButton: boolean; }) => {
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

export const HeaderButtons = (props: { editMode: boolean; showDownloadButton: boolean; }) => {
  const { editMode, showDownloadButton } = props;
  return (
    <span>
      {editMode ?
        <EditableViewButtons />
        : <UneditableViewButtons showDownloadButton={showDownloadButton} />}
    </span>
  )
}
