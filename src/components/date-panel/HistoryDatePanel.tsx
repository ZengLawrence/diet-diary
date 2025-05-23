import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BackButton from "../button/BackButton";
import GoToTodayButton from "../button/GoToTodayButton";
import NextButton from "../button/NextButton";
import HistoryDaysProgressBar from "./HistoryDaysProgressBar";

const ViewProgressBarRow = () => (
  <Row className="flex-fill">
    <HistoryDaysProgressBar />
  </Row>
);

const DatePanelRow = (props: React.PropsWithChildren) => (
  <Row className="flex-fill">
    <Col />
    <Col sm="1" className="d-block d-none d-sm-block" />
    <Col xs="auto" className="align-content-center">
      <BackButton />
    </Col>
    <Col xs="auto" className="align-content-center">
      {props.children}
    </Col>
    <Col xs="auto" className="align-content-center">
      <div className="align-content-center">
        <NextButton />
      </div>
    </Col>
    <Col xs="auto" className="align-content-center">
      <Row>
        <GoToTodayButton />
      </Row>
    </Col>
    <Col className="d-block d-none d-sm-block" />
  </Row>
);

const HistoryDatePanel = (props: React.PropsWithChildren) => (
  <div>
    <ViewProgressBarRow />
    <DatePanelRow>
      {props.children}
    </DatePanelRow>
  </div>
);

export default HistoryDatePanel;