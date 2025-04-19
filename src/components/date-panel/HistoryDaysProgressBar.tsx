import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";
import { historyDaysProgressSelector } from "../../app/selectors";

const HistoryDaysProgressBar = () => {
  const { daysRemaining, totalDays } = useSelector(historyDaysProgressSelector);
  const label = daysRemaining > 1 ? `${daysRemaining} days` : `${daysRemaining} day`;
  return (
    <ProgressBar now={daysRemaining} min={0} max={totalDays} label={label} />
  );
}

export default HistoryDaysProgressBar;