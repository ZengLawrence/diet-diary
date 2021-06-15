import ChangeTargetButton from "../../features/target/ChangeTargetButton";
import TargetDropDown from "../../features/target/TargetDropDown";
import TargetFoodGroupServingGoalBadgePanel from "../../features/target/TargetFoodGroupServingGoalBadgePanel";
import TargetLabel from "../../features/target/TargetLabel";

export const TargetPanel = (props: { editMode: boolean; editTarget: boolean }) => {
  const { editMode, editTarget } = props;
  const showChangeTargetButton = (editMode && !editTarget);

  const caloriePanel = editTarget ? <TargetDropDown /> : <TargetLabel />;

  return (
    <div className="d-flex align-items-center">
      <div>
        <div className="d-flex flex-nowrap  align-items-end">
          Target:&nbsp; {caloriePanel} &nbsp;Cal.
        </div>
        <TargetFoodGroupServingGoalBadgePanel />
      </div>&nbsp;
      {showChangeTargetButton && <ChangeTargetButton />}
    </div>
  );
};
