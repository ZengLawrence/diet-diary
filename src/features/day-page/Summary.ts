import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { Summary } from "../../components/day-page/Summary";
import { NO_TARGET } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  showTabs: targetSelector(state) !== NO_TARGET,
})

export default connect(mapStateToProps)(Summary);