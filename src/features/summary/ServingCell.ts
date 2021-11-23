import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { ServingCell } from "../../components/summary/ServingCell";
import { isNoTarget } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  showTargetAchievementIcon: !isNoTarget(targetSelector(state)),
})

export default connect(mapStateToProps)(ServingCell);