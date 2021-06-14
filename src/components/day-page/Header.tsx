import DoneButton from "../../features/day-page/DoneButton";
import EditButton from "../../features/day-page/EditButton";
import NewDayButton from "../../features/day-page/NewDayButton";
import { DownloadButton } from "../../features/download/DownloadButton";
import TargetPanel from "../../features/target/TargetPanel";
import { AppState } from "../../model/AppState";

export const Header = (props: { state: AppState; }) => {
  const { date, editMode } = props.state;

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
      <h1 className="order-md-1">{date}</h1>
      <div className="order-md-0">
        <TargetPanel />
      </div>
      <div className="order-md-2">
        {editMode && <NewDayButton />}{' '}
        {!editMode && <DownloadButton />}{' '}
        {editMode ? <DoneButton /> : <EditButton />}
      </div>
    </div>
  );
};
