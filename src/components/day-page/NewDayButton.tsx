import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { dayPageSelector } from "../../app/selectors";
import { AppDispatch } from "../../app/store";
import { newDay } from "../../features/day-page/todaySlice";
import { setShowCanNotAddNewDayWarning } from "../../features/warning/warningSlice";
import { validation } from "../../model/diary";
import { VariantDanger } from "../ButtonVariant";

const NewDayButton = () => {

  const dayPage = useSelector(dayPageSelector);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    if (validation.isToday(dayPage.date)) {
      dispatch(setShowCanNotAddNewDayWarning(true));
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