import { connect } from "react-redux";
import { dayPageSelector, editModeSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { DatePanel } from "../../components/day-page/DatePanel";

const mapStateToProps = (state: RootState) => ({
  date: dayPageSelector(state).date,
  showNewDayButton: !editModeSelector(state)
})

export default connect(mapStateToProps)(DatePanel);