import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import { Target } from "../../model/Target";
import { FoodGroupServingGoalBadgePanel } from "../panels/FoodGroupServingGoalBadgePanel";

interface Props {
  show: boolean,
  onHide: () => void,
  targets: Target[],
}

function targetRow(target: Target) {
  return (
    <Row key={String(target.calorie)}>
      <Row>{target.calorie}{' '} Cal.</Row>
      <Row>
        <Col><FoodGroupServingGoalBadgePanel serving={target.serving} /></Col>
        <Col xs="auto"><Button>Edit</Button></Col>
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