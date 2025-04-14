import { connect } from "react-redux";
import { dayPageSelector, isTodaySelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { DatePanel } from "../../components/day-page/DatePanel";

const mapStateToProps = (state: RootState) => ({
  date: dayPageSelector(state).date,
  showNewDayButton: !dayPageSelector(state).editMode,
  showHistoryStepButtons: !isTodaySelector(state),
})

export default connect(mapStateToProps)(DatePanel);