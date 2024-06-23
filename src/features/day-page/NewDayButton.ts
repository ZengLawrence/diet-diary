import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { newDay } from "./dateSlice";
import { ButtonWrapper } from "../../components/ButtonWrapper";


const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(newDay()),
})

export default connect(null, mapDispatchToProps)(ButtonWrapper);
