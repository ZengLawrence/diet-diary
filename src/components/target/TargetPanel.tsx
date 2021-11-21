import ChangeTargetButton from "../../features/target/ChangeTargetButton";
import { NoTargetPanel } from "./NoTargetPanel";
import { TargetCaloriePanel } from "./TargetCaloriePanel";

interface Props {
  editTarget: boolean;
  noTarget: boolean;
  showChangeTargetButton: boolean;
}

export const TargetPanel = (props: Props) => {
  const { editTarget, noTarget, showChangeTargetButton } = props;

  return (
    <div className="d-flex align-items-center">
      {noTarget ? <NoTargetPanel editTarget={editTarget} /> : <TargetCaloriePanel editTarget={editTarget} />}&nbsp;
      {showChangeTargetButton && <ChangeTargetButton />}
    </div>
  );
};
