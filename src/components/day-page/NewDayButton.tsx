import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { newDay } from "../../features/day-page/dateSlice";
import { VariantDanger } from "../ButtonVariant";

const NewDayButton = () => {

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(newDay());
  };

  return (
    <div className="align-self-center">
      <Button 
        variant={VariantDanger}
        onClick={handleClick} >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
}

export default NewDayButton;