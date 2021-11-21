import DoneButton from "../../features/day-page/DoneButton";
import EditButton from "../../features/day-page/EditButton";
import NewDayButton from "../../features/day-page/NewDayButton";
import { DownloadButton } from "../../features/download/DownloadButton";

export const HeaderButtons = (props: { editMode: boolean; showDownloadButton: boolean; }) => {
  const {editMode, showDownloadButton} = props;
  const downloadButton = showDownloadButton ? <DownloadButton /> : "";
  return (
    <span>
      {editMode ? <NewDayButton /> : downloadButton}{' '}
      {editMode ? <DoneButton /> : <EditButton />}
    </span>
  );
}
