import NewDayButton from "./NewDayButton";

export const DatePanel = (props: { date: string; showNewDayButton: boolean }) => (
  <div className="d-flex flex-row">
    <h1 data-cy="date">{props.date}</h1>&nbsp;
    {props.showNewDayButton && <NewDayButton />}
  </div>
);
