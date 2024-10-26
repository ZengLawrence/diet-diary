import { connect } from "react-redux";
import { bestChoiceServingPercentSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { ServingSummary } from "../../components/summary/ServingSummary";

const mapStateToProps = (state: RootState) => ({
  serving: bestChoiceServingPercentSelector(state),
})

export default connect(mapStateToProps)(ServingSummary);