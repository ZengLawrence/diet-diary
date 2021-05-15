import { AppState } from "../../model/AppState";
import { DayEditModeButton } from "./DayEditModeButton";
import { TargetPanel } from "./TargetPanel";
import { NewDayButton } from "./NewDayButton";

export const Header = (props: { state: AppState; }) => {
  const { date, editMode, target, editTarget } = props.state;

  return (
    <div className="d-flex justify-content-between align-items-center">
      <TargetPanel target={target} editMode={editMode} editTarget={editTarget} />
      <h1 className="text-center">{date}</h1>
      <div>
        {editMode && <NewDayButton />}{' '}
        <DayEditModeButton editMode={editMode} />
      </div>
    </div>
  );
};
