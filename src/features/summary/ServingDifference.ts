import { connect } from "react-redux";
import { servingDifferenceSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { ServingSummary } from "../../components/summary/ServingSummary";

const mapStateToProps = (state: RootState) => ({
  serving: servingDifferenceSelector(state),
})

export default connect(mapStateToProps)(ServingSummary);