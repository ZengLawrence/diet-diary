import { changeTargetAction, exitEditTargetAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";
import ChangeTargetButton from "../../features/target/ChangeTargetButton";
import { allTargets, Target } from "../../model/Target";
import { FoodGroupServingGoalBadgePanel } from "../badge/FoodGroupServingGoalBadgePanel";
import { TargetDropDown } from "./TargetDropDown";
import { TargetLabel } from "./TargetLabel";

export const TargetPanel = (props: { target: Target; editMode: boolean; editTarget: boolean }) => {
  const { editMode, target, editTarget } = props;
  const showChangeTargetButton = (editMode && !editTarget);

  const dispatch = useAppDispatch();
  const handleChangeTargetDropDownSelect = (target: Target) => { dispatch(changeTargetAction(target)); dispatch(exitEditTargetAction()); };

  const caloriePanel = (editTarget
    ? <TargetDropDown selectedCalorie={target.calorie} targets={allTargets()} onSelect={handleChangeTargetDropDownSelect} />
    : <TargetLabel calorie={target.calorie} />);

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
