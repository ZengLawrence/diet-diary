import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { viewOptionsSelector } from "../../app/selectors";
import BackButton from "../button/BackButton";
import NewDayButton from "../day-page/NewDayButton";

const TodayDatePanel = (props: React.PropsWithChildren) => {
  const viewOptions = useSelector(viewOptionsSelector);
  const showNewDayButton = viewOptions.canAddNewDay;
  const showBackButton = viewOptions.hasHistory;

  return (
    <Row className="flex-fill">
      <Col xs="auto" />
      <Col xs="auto" className="align-content-center">
        {showBackButton && <BackButton />}
      </Col>
      <Col xs="auto" className="align-content-center">
        {props.children}
      </Col>
      <Col xs="auto" className="align-content-center">
        {showNewDayButton && <NewDayButton />}
      </Col>
      {!showNewDayButton && <Col xs="auto" />}
    </Row>
  );
}

export default TodayDatePanel;