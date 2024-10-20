import { connect } from "react-redux";
import { targetSelector, totalCaloriesSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { WarningBorder } from "../../components/warning/WarningBorder";
import { hasATarget } from "../../model/Target";

function shouldShow(state: RootState): boolean {
  const total = totalCaloriesSelector(state);
  const target = targetSelector(state);
  return hasATarget(target) && (total / target.calorie) > 1.05;
}

function isCritical(state: RootState): boolean {
  const total = totalCaloriesSelector(state);
  const target = targetSelector(state);
  return hasATarget(target) && (total / target.calorie) > 1.10;
}

const mapStateToProps = (state: RootState) => ({
  show: shouldShow(state),
  critical: isCritical(state),
})

export default connect(mapStateToProps)(WarningBorder);