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
  <div className="d-flex flex-row">
    <div className="align-self-center">
      <BackButton />
    </div>&nbsp;
    <div data-cy="date" className="fs-1">{props.date}</div>&nbsp;
    {props.showHistoryStepButtons && 
      <div className="align-self-center">
        <NextButton />&nbsp;
        <GoToTodayButton />
      </div>}
    {props.showNewDayButton && <NewDayButton />}
  </div>
);
