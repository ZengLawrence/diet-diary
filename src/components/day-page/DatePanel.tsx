import BackButton from "../button/BackButton";
import EndPositionButton from "../button/EndPositionButton";
import NextButton from "../button/NextButton";
import StartPositionButton from "../button/StartPositionButton";
import NewDayButton from "./NewDayButton";

interface Props {
  date: string,
  showNewDayButton: boolean,
  showHistoryStepButtons?: boolean,
}

export const DatePanel = (props: Props) => (
  <div className="d-flex flex-row">
    <div className="align-self-center">
      {props.showHistoryStepButtons && <StartPositionButton />}
      <BackButton />
    </div>
    <div data-cy="date" className="fs-1">{props.date}</div>&nbsp;
    {props.showHistoryStepButtons && 
      <div className="align-self-center">
        <NextButton />
        <EndPositionButton />
      </div>}
    {props.showNewDayButton && <NewDayButton />}
  </div>
);
