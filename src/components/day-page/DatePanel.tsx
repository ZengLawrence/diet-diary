import BackButton from "../button/BackButton";
import NewDayButton from "./NewDayButton";

export const DatePanel = (props: { date: string; showNewDayButton: boolean }) => (
  <div className="d-flex flex-row">
    <div className="align-self-center">
      <BackButton />
    </div>
    <div data-cy="date" className="fs-1">{props.date}</div>&nbsp;
    {props.showNewDayButton && <NewDayButton />}
  </div>
);
