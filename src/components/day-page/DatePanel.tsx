import NewDayButton from "./NewDayButton";

export const DatePanel = (props: { date: string; showNewDayButton: boolean }) => (
  <div className="d-flex flex-row">
    <div data-cy="date" className="fs-1">{props.date}</div>&nbsp;
    {props.showNewDayButton && <NewDayButton />}
  </div>
);
