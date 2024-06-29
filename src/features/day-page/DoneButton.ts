import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { exitEditMode } from "./editModeSlice";
import { ButtonWrapper } from "../../components/ButtonWrapper";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(exitEditMode()),
})

export default connect(null, mapDispatchToProps)(ButtonWrapper);
