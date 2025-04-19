import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";
import { historyDaysProgressSelector } from "../../app/selectors";

const ViewProgressBar = () => {
  const { percent, daysRemaining } = useSelector(historyDaysProgressSelector);
  const label = daysRemaining > 1 ? `${daysRemaining} days` : `${daysRemaining} day`;
  return (
    <ProgressBar now={percent} label={label} />
  );
}

export default ViewProgressBar;