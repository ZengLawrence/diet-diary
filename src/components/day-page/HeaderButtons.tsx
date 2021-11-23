import { Fragment } from "react";
import DoneButton from "../../features/day-page/DoneButton";
import EditButton from "../../features/day-page/EditButton";
import NewDayButton from "../../features/day-page/NewDayButton";
import { DownloadButton } from "../../features/download/DownloadButton";

const EditableViewButtons = () => (
  <Fragment>
    <NewDayButton />{' '}
    <DoneButton />
  </Fragment>
)

const UneditableViewButtons = (props: { showDownloadButton: boolean; }) => (
  <Fragment>
    {props.showDownloadButton ? <DownloadButton /> : ""}{' '}
    <EditButton />
  </Fragment>
)

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
