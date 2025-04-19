import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { dayPageSelector, DayPageState } from "../../app/selectors";
import { newDay, today } from "../../features/day-page/dateSlice";
import { add, DayHistory } from "../../features/history/historySlice";
import { seShowCanNotAddNewDayWarning } from "../../features/warning/warningSlice";
import { VariantDanger } from "../ButtonVariant";

function toDayHistory(dayPage: DayPageState): DayHistory {
  return {
    date: dayPage.date,
    target: dayPage.target,
    meals: dayPage.mealStates.map(ms => ms.meal),
  }
}

const NewDayButton = () => {

  const dayPage = useSelector(dayPageSelector);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (dayPage.date === today()) {
      dispatch(seShowCanNotAddNewDayWarning(true));
    } else {
      dispatch(add(toDayHistory(dayPage)));
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