import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { enterEditMode } from "./editModeSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditMode()),
})

export default connect(null, mapDispatchToProps)(Button);