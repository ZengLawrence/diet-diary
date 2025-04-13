import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewDayButton from "../../features/day-page/NewDayButton";
import { VariantDanger } from "../ButtonVariant";

const NewDaySymbolButton = () => (
  <div className="align-self-center">
    <NewDayButton variant={VariantDanger}>
      <FontAwesomeIcon icon={faPlus} />
    </NewDayButton>
  </div>
);

export default NewDaySymbolButton;