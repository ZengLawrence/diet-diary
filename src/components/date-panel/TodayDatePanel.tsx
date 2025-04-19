import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BackButton from "../button/BackButton";
import NewDayButton from "../day-page/NewDayButton";
import { useSelector } from "react-redux";
import { dayPageSelector, isTodaySelector } from "../../app/selectors";


const TodayDatePanel = (props: React.PropsWithChildren) => {
  const editMode = useSelector(dayPageSelector).editMode;
  const isToday = useSelector(isTodaySelector);
  const showNewDayButton = !editMode && isToday;
  
  return (
    <Row className="flex-fill">
      <Col />
      <Col xs="auto" className="align-content-center">
        <BackButton />
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