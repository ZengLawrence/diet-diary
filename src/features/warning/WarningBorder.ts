import { connect } from "react-redux";
import { targetSelector, totalCaloriesSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { WarningBorder } from "../../components/WarningBorder";
import { hasATarget } from "../../model/Target";

function shouldShow(state: RootState): boolean {
  const total = totalCaloriesSelector(state);
  const target = targetSelector(state);
  return hasATarget(target) && (total / target.calorie) > 1.05;
}

const mapStateToProps = (state: RootState) => ({
  show: shouldShow(state),
})

export default connect(mapStateToProps)(WarningBorder);