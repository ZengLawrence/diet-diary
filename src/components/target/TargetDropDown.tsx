import _ from "lodash";
import { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { NO_TARGET, Target } from "../../model/Target";
import { FoodGroupServingGoalBadgePanel } from "../panels/FoodGroupServingGoalBadgePanel";

const MenuItemLabel = (props: { target: Target }) => (
  props.target === NO_TARGET ?
    <Fragment>No Target</Fragment>
    : <Fragment>
      {props.target.calorie}{' '} Cal.<FoodGroupServingGoalBadgePanel serving={props.target.serving} />
    </Fragment>
)

const menuItem = (target: Target) => (
  <Dropdown.Item key={target.calorie} eventKey={target.calorie}>
    <MenuItemLabel target={target} />
  </Dropdown.Item>
)

export const TargetDropDown = (props: { selectedCalorie: number; targets: Target[]; onSelect: (target: Target) => void; }) => {
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
        {props.selectedCalorie === 0 ? "No Target" : props.selectedCalorie}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {_.map(props.targets, menuItem)}
      </Dropdown.Menu>
    </Dropdown>
  );
};
