import { connect } from "react-redux";
import { totalServingSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { ServingSummary } from "../../components/summary/ServingSummary";

const mapStateToProps = (state: RootState) => ({
  serving: totalServingSelector(state),
})


export default connect(mapStateToProps)(ServingSummary);