import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { newDay } from "./dateSlice";


const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(newDay()),
})

export default connect(null, mapDispatchToProps)(Button);
