import { Fragment } from "react";
import ChangeTargetButton from "../../features/target/ChangeTargetButton";
import TargetDropDown from "../../features/target/TargetDropDown";
import TargetFoodGroupServingGoalBadgePanel from "../../features/target/TargetFoodGroupServingGoalBadgePanel";
import TargetLabel from "../../features/target/TargetLabel";

const TargetCaloriePanel = (props: { editTarget: boolean }) => {
  const { editTarget } = props;
  const caloriePanel = editTarget ? <TargetDropDown /> : <TargetLabel />;
  return (
    <div>
      <div className="d-flex flex-nowrap  align-items-end">
        Target:&nbsp; {caloriePanel} &nbsp;Cal.
      </div>
      <TargetFoodGroupServingGoalBadgePanel />
    </div>
  )
}

const NoTargetPanel = (props: { editTarget: boolean }) => {
  const { editTarget } = props;
  return (
    (editTarget ? <TargetDropDown /> : <Fragment>No Target</Fragment>)
  )
}

export const TargetPanel = (props: { editMode: boolean; editTarget: boolean; noTarget: boolean; }) => {
  const { editMode, editTarget, noTarget } = props;
  const showChangeTargetButton = (editMode && !editTarget);

  return (
    <div className="d-flex align-items-center">
      {noTarget ? <NoTargetPanel editTarget={editTarget} /> : <TargetCaloriePanel editTarget={editTarget} />}&nbsp;
      {showChangeTargetButton && <ChangeTargetButton />}
    </div>
  );
};
