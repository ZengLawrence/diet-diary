import { connect } from "react-redux";
import { exitEditTargetAction } from "../../actions";
import { AppDispatch, RootState } from "../../app/store";
import { TargetDropDown } from "../../components/target/TargetDropDown";
import { allTargets, Target } from "../../model/Target";
import { changeTarget } from "./targetSlice";

const mapStateToProps = (state: RootState) => ({
  selectedCalorie: state.target.calorie,
  targets: allTargets(),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSelect: (target: Target) => { dispatch(changeTarget(target)); dispatch(exitEditTargetAction()); },
})

export default connect(mapStateToProps, mapDispatchToProps)(TargetDropDown);