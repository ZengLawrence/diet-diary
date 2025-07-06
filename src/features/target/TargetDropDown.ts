import { connect } from "react-redux";
import { genderSelector, targetSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { TargetDropDown } from "../../components/target/TargetDropDown";
import { Target } from "../../model/Target";
import { changeTarget } from "../day-page/dayPageSlice";

const mapStateToProps = (state: RootState) => ({
  selectedCalorie: targetSelector(state).calorie,
  gender: genderSelector(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSelect: (target: Target) => dispatch(changeTarget(target)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TargetDropDown);