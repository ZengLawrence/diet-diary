import _ from "lodash";
import { Dropdown } from "react-bootstrap";
import { Target } from "../../model/Target";
import { FoodGroupServingGoalBadgePanel } from "../badge/FoodGroupServingGoalBadgePanel";

export const TargetDropDown = (props: { selectedCalorie: number; targets: Target[]; onSelect: (target: Target) => void; }) => {
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
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="outline-info" id="dropdown-goal">
        {props.selectedCalorie}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {menuItems}
      </Dropdown.Menu>
    </Dropdown>
  );
};
