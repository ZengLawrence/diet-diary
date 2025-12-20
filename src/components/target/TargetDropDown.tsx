import _ from "lodash";
import { Fragment, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import GenderToggle from "../../features/target/GenderToggle";
import UnlimitedFruitCheckBox from "../../features/target/UnlimitedFruitCheckBox";
import type { Gender, Target } from "../../model/Target";
import { FoodGroupServingGoalBadgePanel } from "../panels/FoodGroupServingGoalBadgePanel";
import { targetsApi } from "../../features/target";

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
  gender: Gender;
  onSelect: (target: Target) => void;
}

export const TargetDropDown = (props: Props) => {
  const { gender } = props;
  const [targets, setTargets] = useState([] as Target[]);
  useEffect(() => {
    setTargets(targetsApi.getByGender(gender));
  }, [gender])

  const handleSelect = (eventKey: string | null) => {
    const selectedCalorie = _.toNumber(eventKey);
    const selectedTarget = _.find(targets, { 'calorie': selectedCalorie });
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
        {_.map(targets, menuItem)}
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
