import DateSpan from "./DateSpan";
import HistoryDatePanel from "./HistoryDatePanel";
import TodayDatePanel from "./TodayDatePanel";

interface Props {
  showHistoryStepButtons?: boolean,
}

const DatePanel = (props: Props) => (
  props.showHistoryStepButtons
    ? <HistoryDatePanel>
      <DateSpan />
    </HistoryDatePanel>
    : <TodayDatePanel >
      <DateSpan />
    </TodayDatePanel>
);

export default DatePanel;