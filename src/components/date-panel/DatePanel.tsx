import DateSpan from "./DateSpan";
import HistoryDatePanel from "./HistoryDatePanel";
import TodayDatePanel from "./TodayDatePanel";

interface Props {
  showHistoryStepButtons?: boolean,
}

const DatePanel = (props: Props) => {
  const { showHistoryStepButtons } = props;
  const isToday = !showHistoryStepButtons;

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