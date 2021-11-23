import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { exitEditMode } from "./editModeSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(exitEditMode()),
})

export default connect(null, mapDispatchToProps)(Button);
