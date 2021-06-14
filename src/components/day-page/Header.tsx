import DoneButton from "../../features/day-page/DoneButton";
import EditButton from "../../features/day-page/EditButton";
import { DownloadButton } from "../../features/download/DownloadButton";
import { AppState } from "../../model/AppState";
import { NewDayButton } from "./NewDayButton";
import { TargetPanel } from "./TargetPanel";

export const Header = (props: { state: AppState; }) => {
  const { date, editMode, target, editTarget } = props.state;

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
      <h1 className="order-md-1">{date}</h1>
      <div className="order-md-0">
        <TargetPanel target={target} editMode={editMode} editTarget={editTarget} />
      </div>
      <div className="order-md-2">
        {editMode && <NewDayButton />}{' '}
        {!editMode && <DownloadButton />}{' '}
        {editMode ? <DoneButton /> : <EditButton />}
      </div>
    </div>
  );
};
