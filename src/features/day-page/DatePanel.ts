import { connect } from "react-redux";
import { isTodaySelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { DatePanel } from "../../components/date-panel/DatePanel";

const mapStateToProps = (state: RootState) => ({
  showHistoryStepButtons: !isTodaySelector(state),
})

export default connect(mapStateToProps)(DatePanel);