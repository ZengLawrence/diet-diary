import DateSpan from "./DateSpan";
import HistoryDatePanel from "./HistoryDatePanel";
import TodayDatePanel from "./TodayDatePanel";

interface Props {
  showNewDayButton: boolean,
  showHistoryStepButtons?: boolean,
}

export const DatePanel = (props: Props) => (
  props.showHistoryStepButtons
    ? <HistoryDatePanel>
      <DateSpan />
    </HistoryDatePanel>
    : <TodayDatePanel showNewDayButton={props.showNewDayButton}>
      <DateSpan />
    </TodayDatePanel>
);
