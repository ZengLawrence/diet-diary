import { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Action, enterEditTargetAction } from "../../actions";
import { Target } from "../../model/Target";
import { FoodGroupServingBadgePanel } from "../FoodGroupServingBadgePanel";
import { MealDispatch } from "../MealDispatch";

const TargetLabel = (props: { calorie: number; }) => (
  <span className="text-white bg-info border rounded px-1" style={{ fontSize: '24px' }}>{props.calorie}</span>
)

const ChangeTargetButton = (props: { onClick: () => void; }) => {
  return (
    <Button variant="outline-secondary" onClick={props.onClick}>Change</Button>
  );
};

const TargetDropDown = (props: { calorie: number; }) => (
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

export const TargetPanel = (props: { target: Target; editMode: boolean; editTarget: boolean }) => {
  const { editMode, target, editTarget } = props;
  const showChangeTargetButton = (editMode && !editTarget);
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handleClick = () => dispatch(enterEditTargetAction());
  const caloriePanel = (editTarget
    ? <TargetDropDown calorie={target.calorie} />
    : <TargetLabel calorie={target.calorie} />);

  return (
    <div className="d-flex align-items-center">
      <div>
        <div className="d-flex flex-nowrap  align-items-end">
          Target:&nbsp; {caloriePanel} &nbsp;Cal.
        </div>
        <FoodGroupServingBadgePanel serving={target.serving} goal />
      </div>&nbsp;
      {showChangeTargetButton && <ChangeTargetButton onClick={handleClick} />}
    </div>
  );
};
