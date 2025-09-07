import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BackButton from "../button/BackButton";
import GoToTodayButton from "../button/GoToTodayButton";
import NextButton from "../button/NextButton";
import HistoryDaysProgressBar from "./HistoryDaysProgressBar";

const HistoryDatePanel = (props: React.PropsWithChildren) => (
  <div>
    <Row>
      <HistoryDaysProgressBar />
    </Row>
    <Row className="g-2">
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
  </div>
);

export default HistoryDatePanel;