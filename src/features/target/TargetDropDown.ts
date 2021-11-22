import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { TargetDropDown } from "../../components/target/TargetDropDown";
import { allTargets, Target } from "../../model/Target";
import { changeTarget, exitEditTarget } from "./targetStateSlice";

const mapStateToProps = (state: RootState) => ({
  selectedCalorie: targetSelector(state).calorie,
  targets: allTargets(),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSelect: (target: Target) => { dispatch(changeTarget(target)); dispatch(exitEditTarget()); },
})

export default connect(mapStateToProps, mapDispatchToProps)(TargetDropDown);