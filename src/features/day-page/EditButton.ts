import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { enterEditMode } from "./editModeSlice";
import { ButtonWrapper } from "../../components/ButtonWrapper";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditMode()),
})

export default connect(null, mapDispatchToProps)(ButtonWrapper);