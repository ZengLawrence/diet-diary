import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { viewOptionsSelector } from "../../app/selectors";
import BackButton from "../button/BackButton";
import NewDayButton from "../day-page/NewDayButton";
import HamburgerMenu from "./HamburgerMenu";

function useQuery() {
  return new URLSearchParams(window.location.search);
}

function useFeatureFlag(flagName: string) {
  const query = useQuery();
  return query.get(flagName) === 'true';
}

const TodayDatePanel = (props: React.PropsWithChildren) => {
  const viewOptions = useSelector(viewOptionsSelector);
  const showNewDayButton = viewOptions.canAddNewDay;
  const showBackButton = viewOptions.hasHistory;

  const enableShowMenu = useFeatureFlag("showMenu");

  return (
    <Row className="flex-fill">
      <Col className="align-content-center">
        {enableShowMenu && <HamburgerMenu />}
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