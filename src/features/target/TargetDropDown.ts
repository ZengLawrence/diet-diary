import { connect } from "react-redux";
import { changeTargetAction, exitEditTargetAction } from "../../actions";
import { AppDispatch, RootState } from "../../app/store";
import { TargetDropDown } from "../../components/target/TargetDropDown";
import { allTargets, Target } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  selectedCalorie: state.target.calorie,
  targets: allTargets(),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSelect: (target: Target) => { dispatch(changeTargetAction(target)); dispatch(exitEditTargetAction()); },
})

export default connect(mapStateToProps, mapDispatchToProps)(TargetDropDown);