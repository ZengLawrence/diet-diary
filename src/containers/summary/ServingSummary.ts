import { connect } from "react-redux";
import { ServingSummarySelector } from "../../components/summary/ServingSummarySelector";
import { AppState } from "../../model/AppState";

const mapStateToProps = (state: AppState) => ({
  compactView: state.compactView,
})

export default connect(mapStateToProps)(ServingSummarySelector);
