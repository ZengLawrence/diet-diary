import BackButton from "../button/BackButton";
import NewDayButton from "./NewDayButton";

interface Props {
  date: string,
  showNewDayButton: boolean,
}

export const DatePanel = (props: Props) => (
  <div className="d-flex flex-row">
    <div className="align-self-center">
      <BackButton />
    </div>
    <div data-cy="date" className="fs-1">{props.date}</div>&nbsp;
    {props.showNewDayButton && <NewDayButton />}
  </div>
);
