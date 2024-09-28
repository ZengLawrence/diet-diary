import { connect } from "react-redux";
import { dateSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { DatePanel } from "../../components/day-page/DatePanel";

const mapStateToProps = (state: RootState) => ({
  date: dateSelector(state),
})

export default connect(mapStateToProps)(DatePanel);