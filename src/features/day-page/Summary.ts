import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { Summary } from "../../components/day-page/Summary";
import { hasATarget } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  showTabs: hasATarget(targetSelector(state)),
})

export default connect(mapStateToProps)(Summary);