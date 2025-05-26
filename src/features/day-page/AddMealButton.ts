import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { ButtonWrapper } from "../../components/ButtonWrapper";
import { addMeal } from "./todaySlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(addMeal()),
})

export default connect(null, mapDispatchToProps)(ButtonWrapper);
