import { connect } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { exitEditMode } from "./editModeSlice";
import { ButtonWrapper } from "../../components/ButtonWrapper";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(exitEditMode()),
})

export default connect(null, mapDispatchToProps)(ButtonWrapper);
