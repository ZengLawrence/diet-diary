import { connect } from "react-redux";
import { genderSelector } from "../../app/selectors";
import type { AppDispatch, RootState } from "../../app/store";
import { GenderToggle } from "../../components/target/GenderToggle";
import type { Gender } from "../../model/Target";
import { changeGender } from "./targetStateSlice";

const mapStateToProps = (state: RootState) => ({
  value: genderSelector(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onChange: (gender: Gender) => dispatch(changeGender(gender)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GenderToggle);