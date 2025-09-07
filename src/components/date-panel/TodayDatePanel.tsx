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
    <div>
      <Row className="g-2">
        <Col>
          {showBackButton && <BackButton />}
        </Col>
        <Col>
          {props.children}
        </Col>
        <Col>
          {showNewDayButton && <NewDayButton />}
        </Col>
      </Row>
    </div>
  );
}

export default TodayDatePanel;