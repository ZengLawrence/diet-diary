import DoneButton from "../../features/day-page/DoneButton";
import EditButton from "../../features/day-page/EditButton";
import NewDayButton from "../../features/day-page/NewDayButton";
import { DownloadButton } from "../../features/download/DownloadButton";

export const HeaderButtons = (props: { editMode: boolean; }) => (
  <span>
    {props.editMode ? <NewDayButton /> : <DownloadButton />}{' '}
    {props.editMode ? <DoneButton /> : <EditButton />}
  </span>
);
