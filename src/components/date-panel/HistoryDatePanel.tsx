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
  <Row className="flex-fill g-2">
    <Col>
      <BackButton />
    </Col>
    <Col>
      {props.children}
    </Col>
    <Col>
      <NextButton />
    </Col>
    <Col>
      <GoToTodayButton />
    </Col>
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