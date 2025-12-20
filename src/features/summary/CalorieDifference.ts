import { connect } from "react-redux";
import { calorieDifferenceSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { CalorieSummary } from "../../components/summary/CalorieSummary";

const mapStateToProps = (state: RootState) => ({
  calories: calorieDifferenceSelector(state),
})

export default connect(mapStateToProps)(CalorieSummary);