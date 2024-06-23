import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { enterEditTarget } from "./targetStateSlice";
import { ButtonWrapper } from "../../components/ButtonWrapper";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditTarget()),
})

export default connect(null, mapDispatchToProps)(ButtonWrapper);

