import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { AddButton } from "../../components/buttons/AddButton";
import { addMeal } from "./mealStatesSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(addMeal()),
})

export default connect(null, mapDispatchToProps)(AddButton);