import _ from "lodash";
import { Button, Dropdown } from "react-bootstrap";
import { changeTargetAction, enterEditTargetAction, exitEditTargetAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";
import { allTargets, Target } from "../../model/Target";
import { FoodGroupServingGoalBadgePanel } from "../badge/FoodGroupServingGoalBadgePanel";

const TargetLabel = (props: { calorie: number; }) => (
  <span className="text-white bg-info border rounded px-1" style={{ fontSize: '24px' }}>{props.calorie}</span>
)

const ChangeTargetButton = (props: { onClick: () => void; }) => {
  return (
    <Button variant="outline-secondary" onClick={props.onClick}>Change</Button>
  );
};

const TargetDropDown = (props: { selectedCalorie: number; targets: Target[], onSelect: (target: Target) => void; }) => {
  const menuItems = props.targets.map(target => (
    <Dropdown.Item key={target.calorie} eventKey={target.calorie}>
      {target.calorie}{' '} Cal.<FoodGroupServingGoalBadgePanel serving={target.serving} />
    </Dropdown.Item>
  ));
  const handleSelect = (eventKey: any) => {
    const selectedCalorie = _.toNumber(eventKey);
    const selectedTarget = _.find(props.targets, { 'calorie': selectedCalorie });
    if (selectedTarget) {
      props.onSelect(selectedTarget);
    }
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="outline-info" id="dropdown-goal">
        {props.selectedCalorie}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {menuItems}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export const TargetPanel = (props: { target: Target; editMode: boolean; editTarget: boolean }) => {
  const { editMode, target, editTarget } = props;
  const showChangeTargetButton = (editMode && !editTarget);

  const dispatch = useAppDispatch();
  const handleChangeTargetButtonClick = () => dispatch(enterEditTargetAction());
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
      {showChangeTargetButton && <ChangeTargetButton onClick={handleChangeTargetButtonClick} />}
    </div>
  );
};
