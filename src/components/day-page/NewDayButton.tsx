import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { dateSelector } from "../../app/selectors";
import { newDay, today } from "../../features/day-page/dateSlice";
import { seShowCanNotAddNewDayWarning } from "../../features/warning/warningSlice";
import { VariantDanger } from "../ButtonVariant";

const NewDayButton = () => {

  const date: string = useSelector(dateSelector);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (date === today()) {
      dispatch(seShowCanNotAddNewDayWarning(true));
    } else {
      dispatch(newDay());
    }
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