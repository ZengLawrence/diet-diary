import { connect } from "react-redux";
import { genderSelector, targetSelector, targetsSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { TargetDropDown } from "../../components/target/TargetDropDown";
import { Target } from "../../model/Target";
import { changeTarget } from "./targetStateSlice";

const mapStateToProps = (state: RootState) => ({
  selectedCalorie: targetSelector(state).calorie,
  targets: targetsSelector(state),
  showEditButton: genderSelector(state) == "custom"
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSelect: (target: Target) => dispatch(changeTarget(target)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TargetDropDown);