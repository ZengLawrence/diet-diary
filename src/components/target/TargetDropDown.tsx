import _ from "lodash";
import { Fragment } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GenderToggle from "../../features/target/GenderToggle";
import UnlimitedFruitCheckBox from "../../features/target/UnlimitedFruitCheckBox";
import { Target } from "../../model/Target";
import { FoodGroupServingGoalBadgePanel } from "../panels/FoodGroupServingGoalBadgePanel";

const MenuItemLabel = (props: { target: Target }) => (
  <Fragment>
    {props.target.calorie}{' '} Cal.<FoodGroupServingGoalBadgePanel serving={props.target.serving} />
  </Fragment>
)

const menuItem = (target: Target) => (
  <Dropdown.Item key={target.calorie} eventKey={target.calorie}>
    <MenuItemLabel target={target} />
  </Dropdown.Item>
)

interface Props {
  selectedCalorie: number;
  targets: Target[];
  onSelect: (target: Target) => void;
}

export const TargetDropDown = (props: Props) => {
  const handleSelect = (eventKey: string | null) => {
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
        {_.map(props.targets, menuItem)}
        <Dropdown.Divider />
        <div className="px-1">
          <UnlimitedFruitCheckBox />
        </div>
        <Dropdown.Divider />
        <div className="w-100 d-flex justify-content-center">
          <GenderToggle />
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};
