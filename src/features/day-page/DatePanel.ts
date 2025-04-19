import { connect } from "react-redux";
import { dayPageSelector, isTodaySelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { DatePanel } from "../../components/date-panel/DatePanel";

const mapStateToProps = (state: RootState) => ({
  showNewDayButton: !dayPageSelector(state).editMode && isTodaySelector(state),
  showHistoryStepButtons: !isTodaySelector(state),
})

export default connect(mapStateToProps)(DatePanel);