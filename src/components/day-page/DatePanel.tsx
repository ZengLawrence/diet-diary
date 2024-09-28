import NewDayButton from "../../features/day-page/NewDayButton";
import { VariantDanger } from "../ButtonVariant";

export const DatePanel = (props: { date: string; showNewDayButton: boolean }) => (
  <div className="d-flex flex-column align-items-center">
    <h1 data-cy="date">{props.date}</h1>
    {props.showNewDayButton && <NewDayButton variant={VariantDanger}>New Day</NewDayButton>}
  </div>
);
