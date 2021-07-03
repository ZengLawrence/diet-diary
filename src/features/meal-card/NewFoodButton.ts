import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { AddButton } from "../../components/buttons/AddButton";
import { enterMealAddMode } from "../day-page/mealStatesSlice";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; }) => ({
  onClick: () => dispatch(enterMealAddMode(ownProps)),
})

export default connect(null, mapDispatchToProps)(AddButton);