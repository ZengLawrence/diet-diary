import DateSpan from "./DateSpan";
import HistoryDatePanel from "./HistoryDatePanel";
import TodayDatePanel from "./TodayDatePanel";

interface Props {
  date: string,
  showNewDayButton: boolean,
  showHistoryStepButtons?: boolean,
}

export const DatePanel = (props: Props) => (
  props.showHistoryStepButtons
    ? <HistoryDatePanel>
      <DateSpan date={props.date}></DateSpan>
    </HistoryDatePanel>
    : <TodayDatePanel showNewDayButton={props.showNewDayButton}>
      <DateSpan date={props.date}></DateSpan>
    </TodayDatePanel>
);
