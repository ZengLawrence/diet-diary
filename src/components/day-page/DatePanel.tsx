import { Col, Row } from "react-bootstrap";
import BackButton from "../button/BackButton";
import GoToTodayButton from "../button/GoToTodayButton";
import NextButton from "../button/NextButton";
import NewDayButton from "./NewDayButton";

interface Props {
  date: string,
  showNewDayButton: boolean,
  showHistoryStepButtons?: boolean,
}

export const DatePanel = (props: Props) => (
  <Row className="flex-fill">
    <Col />
    {props.showHistoryStepButtons && <Col xs="auto" sm="1" />}
    <Col xs="auto" className="align-content-center">
      <BackButton />
    </Col>
    <Col xs="auto" className="align-content-center">
      <div data-cy="date" className="fs-1">{props.date}</div>
    </Col>
    <Col xs="auto" className="align-content-center">
      {props.showHistoryStepButtons &&
        <div className="align-content-center">
          <NextButton />
        </div>}
      {props.showNewDayButton && <NewDayButton />}
    </Col>
    <Col xs="auto" className="align-content-center">
      <Row>
        {props.showHistoryStepButtons &&
          <GoToTodayButton />}
      </Row>
    </Col>
    <Col />
  </Row>
);
