import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { Footer } from "../../components/day-page/Footer";
import { hasATarget } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  showTargetActionLegends: hasATarget(targetSelector(state)),
})

export default connect(mapStateToProps)(Footer);
