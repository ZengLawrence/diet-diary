import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetLabel } from "../../components/target/TargetLabel";
import { isNoTarget, Target } from "../../model/Target";

function getLabel(target: Target) {
  return isNoTarget(target) ? "No Target" : target.calorie;
}

const mapStateToProps = (state: RootState) => ({
  label: getLabel(targetSelector(state)),
})

export default connect(mapStateToProps)(TargetLabel);