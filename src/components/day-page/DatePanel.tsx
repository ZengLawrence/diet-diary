import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BackButton from "../button/BackButton";
import { DateSpan } from "./DateSpan";
import HistoryDatePanel from "./HistoryDatePanel";
import NewDayButton from "./NewDayButton";

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
