import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addMeal } from "./mealStatesSlice";
import { ButtonWrapper } from "../../components/ButtonWrapper";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(addMeal()),
})

export default connect(null, mapDispatchToProps)(ButtonWrapper);
