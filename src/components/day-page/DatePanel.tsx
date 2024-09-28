import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewDayButton from "../../features/day-page/NewDayButton";
import { VariantDanger } from "../ButtonVariant";

const NewDaySymbolButton = () => (
  <NewDayButton variant={VariantDanger}>
    <FontAwesomeIcon icon={faPlus} />
  </NewDayButton>
);

export const DatePanel = (props: { date: string; showNewDayButton: boolean }) => (
  <div className="d-flex flex-row">
    <h1 data-cy="date">{props.date}</h1>
    {props.showNewDayButton && <NewDaySymbolButton />}
  </div>
);
