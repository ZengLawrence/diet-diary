import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BackButton from "../button/BackButton";
import NewDayButton from "../day-page/NewDayButton";
import { useSelector } from "react-redux";
import { historyDaysProgressSelector, viewOptionsSelector } from "../../app/selectors";

const TodayDatePanel = (props: React.PropsWithChildren) => {
  const showNewDayButton = useSelector(viewOptionsSelector).canAddNewDay;
  const showBackButton = useSelector(historyDaysProgressSelector).totalDays > 0;
  
  return (
    <Row className="flex-fill">
      <Col />
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
      <Col />
    </Row>
  );
}

export default TodayDatePanel;