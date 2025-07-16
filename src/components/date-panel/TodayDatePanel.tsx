import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { viewOptionsSelector } from "../../app/selectors";
import BackButton from "../button/BackButton";
import NewDayButton from "../day-page/NewDayButton";
import { VariantSecondary } from "../ButtonVariant";

const TodayDatePanel = (props: React.PropsWithChildren) => {
  const viewOptions = useSelector(viewOptionsSelector);
  const showNewDayButton = viewOptions.canAddNewDay;
  const showBackButton = viewOptions.hasHistory;

  return (
    <Row className="flex-fill">
      <Col>
        <Button variant={VariantSecondary}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </Col>
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