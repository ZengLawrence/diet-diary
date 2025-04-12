import _ from "lodash";
import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import EditCustomTargetsOffcanvas from "../../features/target/EditCustomTargetsOffcanvas";
import GenderToggle from "../../features/target/GenderToggle";
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

const EditButtonMenuItem = () => {

  const [showEditCustomTargets, setShowEditCustomTargets] = useState(false);

  return (
    <Fragment>
      <Dropdown.Item className="d-flex flex-row-reverse">
        <Button onClick={() => setShowEditCustomTargets(true)}>Edit</Button>
      </Dropdown.Item>

      <EditCustomTargetsOffcanvas
        show={showEditCustomTargets}
        onHide={() => setShowEditCustomTargets(false)}
      />
    </Fragment>
  )
}

const UnlimitedFruitCheckBox = () => (
  <Form.Check
    type="switch"
    id="unlimited-fruit"
    label="Unlimited Fruit" />
);

interface Props {
  selectedCalorie: number;
  targets: Target[];
  onSelect: (target: Target) => void;
  showEditButton?: boolean;
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
        {props.showEditButton && <EditButtonMenuItem />}
        <Dropdown.Divider />
        <UnlimitedFruitCheckBox />
        <Dropdown.Divider />
        <div className="w-100 d-flex justify-content-center">
          <GenderToggle />
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};
