import { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import { customTargets } from "../../features/target";
import type { CustomTargetListener, Target } from "../../model/customTarget";
import { AbstractCustomTargetListener } from "../../model/customTarget";
import { FoodGroupServingGoalBadgePanel } from "../panels/FoodGroupServingGoalBadgePanel";
import TargetEditForm from "./TargetEditForm";

interface Props {
  show: boolean,
  onHide: () => void,
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

const TargetRow = (props: { target: Target }) => {

  const { target } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <Row>
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

const EditCustomTargetsOffcanvas = (props: Props) => {

  const [targets, setTargets] = useState([] as Target[]);
  useEffect(() => {
    const listener: CustomTargetListener = new class extends AbstractCustomTargetListener {
      targetsUpdated(targets: Target[]) {
        setTargets(targets);
      }
    };
    customTargets.registerListener(listener);
    setTargets(customTargets.getAll());

    return () => {
      customTargets.unregisterListener(listener);
    }
  }, []);

  return (
    <Offcanvas id="savedMeals" show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Custom Targets</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="container">
        {targets.map(target => <TargetRow key={target.calorie} target={target} />)}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default EditCustomTargetsOffcanvas;