import { connect } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { ButtonWrapper } from "../../components/ButtonWrapper";
import { addMeal } from "./dayPageSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(addMeal()),
})

export default connect(null, mapDispatchToProps)(ButtonWrapper);
