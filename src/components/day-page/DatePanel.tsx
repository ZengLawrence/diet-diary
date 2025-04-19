import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BackButton from "../button/BackButton";
import GoToTodayButton from "../button/GoToTodayButton";
import NextButton from "../button/NextButton";
import NewDayButton from "./NewDayButton";
import { DateSpan } from "./DateSpan";

const HistoryDatePanel = (props: React.PropsWithChildren) => (
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

type ShowNewDayButtonProps = Pick<Props, 'showNewDayButton'>;

const TodayDatePanel = (props: React.PropsWithChildren<ShowNewDayButtonProps>) => (
  <Row className="flex-fill">
    <Col />
    <Col xs="auto" className="align-content-center">
      <BackButton />
    </Col>
    <Col xs="auto" className="align-content-center">
      {props.children}
    </Col>
    <Col xs="auto" className="align-content-center">
      {props.showNewDayButton && <NewDayButton />}
    </Col>
    {!props.showNewDayButton &&
      <Col xs="auto" />}
    <Col />
  </Row>
);

interface Props {
  date: string,
  showNewDayButton: boolean,
  showHistoryStepButtons?: boolean,
}

export const DatePanel = (props: Props) => (
  props.showHistoryStepButtons
    ? <HistoryDatePanel>
      <DateSpan date={props.date}></DateSpan>
    </HistoryDatePanel>
    : <TodayDatePanel showNewDayButton={props.showNewDayButton}>
      <DateSpan date={props.date}></DateSpan>
    </TodayDatePanel>
);
