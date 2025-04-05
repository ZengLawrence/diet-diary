import { connect } from "react-redux";
import { customTargetsStateSelector, targetSelector, targetStateSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { TargetDropDown } from "../../components/target/TargetDropDown";
import { Target, targetsByGender } from "../../model/Target";
import { changeTarget } from "./targetStateSlice";

function mapTargets(state: RootState) {
  const gender = targetStateSelector(state).gender;
  if (gender == "custom") {
    return customTargetsStateSelector(state).targets;
  } else {
    return targetsByGender(gender);
  }
}

const mapStateToProps = (state: RootState) => ({
  selectedCalorie: targetSelector(state).calorie,
  targets: mapTargets(state),
  showEditButton: targetStateSelector(state).gender == "custom"
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSelect: (target: Target) => dispatch(changeTarget(target)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TargetDropDown);