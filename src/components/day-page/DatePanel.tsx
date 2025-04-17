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
    <Col>
      <div className="d-flex flex-row">
        <BackButton />&nbsp;
        <div data-cy="date" className="fs-1">{props.date}</div>&nbsp;
        {props.showHistoryStepButtons &&
          <NextButton />}
        {props.showNewDayButton && <NewDayButton />}
      </div>
    </Col>
    <Col>
      {props.showHistoryStepButtons &&
        <GoToTodayButton />}
    </Col>
  </Row>
);
