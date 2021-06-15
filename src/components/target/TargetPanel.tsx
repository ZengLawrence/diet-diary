import ChangeTargetButton from "../../features/target/ChangeTargetButton";
import TargetDropDown from "../../features/target/TargetDropDown";
import TargetLabel from "../../features/target/TargetLabel";
import { Target } from "../../model/Target";
import { FoodGroupServingGoalBadgePanel } from "../badge/FoodGroupServingGoalBadgePanel";

export const TargetPanel = (props: { target: Target; editMode: boolean; editTarget: boolean }) => {
  const { editMode, target, editTarget } = props;
  const showChangeTargetButton = (editMode && !editTarget);

  const caloriePanel = editTarget ? <TargetDropDown /> : <TargetLabel />;

  return (
    <div className="d-flex align-items-center">
      <div>
        <div className="d-flex flex-nowrap  align-items-end">
          Target:&nbsp; {caloriePanel} &nbsp;Cal.
        </div>
        <FoodGroupServingGoalBadgePanel serving={target.serving} />
      </div>&nbsp;
      {showChangeTargetButton && <ChangeTargetButton />}
    </div>
  );
};
