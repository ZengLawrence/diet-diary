import ChangeTargetButton from "../../features/target/ChangeTargetButton";
import { NoTargetPanel } from "./NoTargetPanel";
import { TargetCaloriePanel } from "./TargetCaloriePanel";

export const TargetPanel = (props: { editTarget: boolean; noTarget: boolean; }) => {
  const { editTarget, noTarget } = props;

  return (
    <div className="d-flex align-items-center">
      {noTarget ? <NoTargetPanel editTarget={editTarget} /> : <TargetCaloriePanel editTarget={editTarget} />}&nbsp;
      {editTarget && <ChangeTargetButton />}
    </div>
  );
};
