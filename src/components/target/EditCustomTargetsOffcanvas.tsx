import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import { Target } from "../../model/Target";
import { FoodGroupServingGoalBadgePanel } from "../panels/FoodGroupServingGoalBadgePanel";
import { Fragment, useState } from "react";
import TargetEditForm from "../../features/target/TargetEditForm";

interface Props {
  show: boolean,
  onHide: () => void,
  targets: Target[],
}

const TargetPanel = (props: {
  target: Target,
  onClick: () => void,
}) => (
  <Fragment>
    <Col><FoodGroupServingGoalBadgePanel serving={props.target.serving} /></Col>
    <Col xs="auto"><Button onClick={props.onClick}>Edit</Button></Col>
  </Fragment>
);

function targetRow(target: Target) {

  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <Row key={String(target.calorie)}>
      <Row>{target.calorie}{' '} Cal.</Row>
      <Row>
        {showEditForm
          ? <TargetEditForm target={target} hide={() => setShowEditForm(false)} />
          : <TargetPanel target={target} onClick={() => setShowEditForm(true)} />
        }
      </Row>
    </Row>
  );
}

const EditCustomTargetsOffcanvas = (props: Props) => (
  <Offcanvas id="savedMeals" show={props.show} onHide={props.onHide}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Custom Targets</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body className="container">
      {props.targets.map(targetRow)}
    </Offcanvas.Body>
  </Offcanvas>
);

export default EditCustomTargetsOffcanvas;