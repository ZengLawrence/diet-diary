import ChangeTargetButton from "../../features/target/ChangeTargetButton";
import { NoTargetPanel } from "./NoTargetPanel";
import { TargetCaloriePanel } from "./TargetCaloriePanel";

interface Props {
  editMode: boolean,
  editTarget: boolean;
  noTarget: boolean;
}

export const TargetPanel = (props: Props) => {
  const { editMode, editTarget, noTarget } = props;
  const showChangeTargetButton = editMode && !editTarget;

  return (
    <div className="d-flex align-items-center">
      {noTarget ? <NoTargetPanel editTarget={editTarget} /> : <TargetCaloriePanel editTarget={editTarget} />}&nbsp;
      {showChangeTargetButton && <ChangeTargetButton />}
    </div>
  );
};
