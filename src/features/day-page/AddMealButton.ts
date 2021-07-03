import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { AddButton } from "../../components/buttons/AddButton";
import { newMeal } from "./mealStatesSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(newMeal()),
})

export default connect(null, mapDispatchToProps)(AddButton);