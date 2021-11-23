import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { enterEditTarget } from "./targetStateSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditTarget()),
})

export default connect(null, mapDispatchToProps)(Button);

