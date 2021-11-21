import TargetDropDown from "../../features/target/TargetDropDown";
import TargetFoodGroupServingGoalBadgePanel from "../../features/target/TargetFoodGroupServingGoalBadgePanel";
import TargetLabel from "../../features/target/TargetLabel";

export const TargetCaloriePanel = (props: { editTarget: boolean; }) => {
  const { editTarget } = props;
  const caloriePanel = editTarget ? <TargetDropDown /> : <TargetLabel />;
  return (
    <div>
      <div className="d-flex flex-nowrap  align-items-end">
        Target:&nbsp; {caloriePanel} &nbsp;Cal.
      </div>
      <TargetFoodGroupServingGoalBadgePanel />
    </div>
  );
};
