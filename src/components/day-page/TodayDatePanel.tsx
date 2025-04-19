import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BackButton from "../button/BackButton";
import NewDayButton from "./NewDayButton";

interface TodayDatePanelProps {
  showNewDayButton: boolean;
}

const TodayDatePanel = (props: React.PropsWithChildren<TodayDatePanelProps>) => (
  <Row className="flex-fill">
    <Col />
    <Col xs="auto" className="align-content-center">
      <BackButton />
    </Col>
    <Col xs="auto" className="align-content-center">
      {props.children}
    </Col>
    <Col xs="auto" className="align-content-center">
      {props.showNewDayButton && <NewDayButton />}
    </Col>
    {!props.showNewDayButton && <Col xs="auto" />}
    <Col />
  </Row>
);

export default TodayDatePanel;