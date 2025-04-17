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
    <Col xs="4">
      <BackButton />
    </Col>
    <Col data-cy="date" className="fs-1" xs="4">{props.date}</Col>
    <Col xs="4">
      <Row>
        {props.showHistoryStepButtons &&
          <div>
            <NextButton />
            <GoToTodayButton />
          </div>}
        {props.showNewDayButton && <NewDayButton />}
      </Row>
    </Col>
  </Row>
);
