import { Col, Row } from "react-bootstrap";
import BackButton from "../button/BackButton";
import GoToTodayButton from "../button/GoToTodayButton";
import NextButton from "../button/NextButton";
import NewDayButton from "./NewDayButton";
import { Fragment } from "react";

interface Props {
  date: string,
  showNewDayButton: boolean,
  showHistoryStepButtons?: boolean,
}

export const DatePanel = (props: Props) => (
  <Row className="flex-fill">
    <Col />
    <Col xs="auto" className="align-content-center">
      <div className="d-flex flex-row">
        <div className="align-content-center">
          <BackButton />
        </div>&nbsp;
        <div data-cy="date" className="fs-1">{props.date}</div>&nbsp;
        {props.showHistoryStepButtons &&
          <div className="align-content-center">
            <NextButton />
          </div>}
        {props.showNewDayButton && <NewDayButton />}
      </div>
    </Col>
    <Col className="align-content-center">
      {props.showHistoryStepButtons &&
        <GoToTodayButton />}
    </Col>
  </Row>
);
