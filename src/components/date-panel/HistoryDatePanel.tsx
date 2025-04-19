import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import BackButton from "../button/BackButton";
import GoToTodayButton from "../button/GoToTodayButton";
import NextButton from "../button/NextButton";

const ViewProgressBarRow = () => {
  return (
    <Row className="flex-fill">
      <ProgressBar now={80} />
    </Row>
  );
}

const HistoryDatePanel = (props: React.PropsWithChildren) => (
  <div>
    <ViewProgressBarRow />
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

  </div>
);

export default HistoryDatePanel;