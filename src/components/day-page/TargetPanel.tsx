import _ from "lodash";
import { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Action, changeTargetAction, enterEditTargetAction, exitEditTargetAction } from "../../actions";
import { allTargets, Target } from "../../model/Target";
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

const TargetDropDown = (props: { selectedCalorie: number; targets: Target[], onSelect: (target: Target) => void; }) => {
  const menuItems = props.targets.map(target => (
    <Dropdown.Item eventKey={target.calorie}>
      {target.calorie}{' '} Cal.<FoodGroupServingBadgePanel serving={target.serving} goal />
    </Dropdown.Item>
  ));
  const handleSelect = (eventKey: any) => {
    const selectedCalorie = _.toNumber(eventKey);
    const selectedTarget = _.find(props.targets, {'calorie': selectedCalorie});
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

  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
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
        <FoodGroupServingBadgePanel serving={target.serving} goal />
      </div>&nbsp;
      {showChangeTargetButton && <ChangeTargetButton onClick={handleChangeTargetButtonClick} />}
    </div>
  );
};