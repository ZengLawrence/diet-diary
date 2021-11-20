import ChangeTargetButton from "../../features/target/ChangeTargetButton";
import { NoTargetPanel } from "./NoTargetPanel";
import { TargetCaloriePanel } from "./TargetCaloriePanel";

export const TargetPanel = (props: { editMode: boolean, editTarget: boolean; noTarget: boolean; }) => {
  const { editMode, editTarget, noTarget } = props;
  const showChangeTargetButton = editMode && !editTarget;

  return (
    <div className="d-flex align-items-center">
      {noTarget ? <NoTargetPanel editTarget={editTarget} /> : <TargetCaloriePanel editTarget={editTarget} />}&nbsp;
      {showChangeTargetButton && <ChangeTargetButton />}
    </div>
  );
};
