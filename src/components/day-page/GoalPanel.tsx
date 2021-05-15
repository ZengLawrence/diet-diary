import { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Action, enterEditGoalAction } from "../../actions";
import { Goal } from "../../model/Goal";
import { FoodGroupServingBadgePanel } from "../FoodGroupServingBadgePanel";
import { MealDispatch } from "../MealDispatch";

const GoalLabel = (props: { calorie: number; }) => (
  <span className="text-white bg-info border rounded px-1" style={{ fontSize: '24px' }}>{props.calorie}</span>
)

const ChangeGoalButton = (props: { onClick: () => void; }) => {
  return (
    <Button variant="outline-secondary" onClick={props.onClick}>Change</Button>
  );
};

const GoalDropDown = (props: { calorie: number; }) => (
  <Dropdown>
    <Dropdown.Toggle variant="outline-info" id="dropdown-goal">
      {props.calorie}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item>1200</Dropdown.Item>
      <Dropdown.Item>1400</Dropdown.Item>
      <Dropdown.Item>1600</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export const GoalPanel = (props: { goal: Goal; editMode: boolean; editGoal: boolean }) => {
  const { editMode, goal, editGoal } = props;
  const showChangeGoalButton = (editMode && !editGoal);
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handleClick = () => dispatch(enterEditGoalAction());
  const caloriePanel = (editGoal
    ? <GoalDropDown calorie={goal.calorie} />
    : <GoalLabel calorie={goal.calorie} />);

  return (
    <div className="d-flex align-items-center">
      <div>
        <div className="d-flex flex-nowrap  align-items-end">
          Goal:&nbsp; {caloriePanel} &nbsp;Cal.
        </div>
        <FoodGroupServingBadgePanel serving={goal.serving} goal />
      </div>&nbsp;
      {showChangeGoalButton && <ChangeGoalButton onClick={handleClick} />}
    </div>
  );
};
