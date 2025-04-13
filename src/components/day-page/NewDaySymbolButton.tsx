import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { newDay } from "../../features/day-page/dateSlice";
import { VariantDanger } from "../ButtonVariant";

const NewDaySymbolButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="align-self-center">
      <Button 
        variant={VariantDanger}
        onClick={() => dispatch(newDay())} >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
}

export default NewDaySymbolButton;