import { useSelector } from "react-redux";
import { viewOptionsSelector } from "../../app/selectors";
import DateSpan from "./DateSpan";
import HistoryDatePanel from "./HistoryDatePanel";
import TodayDatePanel from "./TodayDatePanel";

const DatePanel = () => {
  const isToday = useSelector(viewOptionsSelector).isToday;

  return (
    isToday
      ? <TodayDatePanel >
        <DateSpan />
      </TodayDatePanel>
      : <HistoryDatePanel>
        <DateSpan />
      </HistoryDatePanel>
  );
}

export default DatePanel;