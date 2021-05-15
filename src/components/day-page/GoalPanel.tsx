import { Button } from "react-bootstrap";
import { Goal } from "../../model/Goal";
import { FoodGroupServingBadgePanel } from "../FoodGroupServingBadgePanel";

export const GoalPanel = (props: { goal: Goal; editMode: boolean; }) => {
  const { editMode, goal } = props;
  return (
    <div className="d-flex align-items-center">
      <GoalLabel goal={goal} />{' '}
      {editMode && <ChangeGoalButton onClick={() => { }} />}
    </div>
  );
};

const GoalLabel = (props: { goal: Goal; }) => {
  const { goal } = props;
  return (
    <div>
      <div className="d-flex flex-nowrap  align-items-end">
        Goal:&nbsp;<span className="text-white bg-info border rounded px-1" style={{ fontSize: '24px' }}>{goal.calorie}</span>&nbsp;Cal.
    </div>
      <FoodGroupServingBadgePanel serving={goal.serving} goal />
    </div>
  );
};

const ChangeGoalButton = (props: { onClick: () => void; }) => {
  return (
    <Button variant="outline-secondary" onClick={props.onClick}>Change</Button>
  );
};
