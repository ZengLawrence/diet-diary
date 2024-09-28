import { connect } from "react-redux";
import { dateSelector, editModeSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { DatePanel } from "../../components/day-page/DatePanel";

const mapStateToProps = (state: RootState) => ({
  date: dateSelector(state),
  showNewDayButton: !editModeSelector(state)
})

export default connect(mapStateToProps)(DatePanel);