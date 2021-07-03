import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { enterMealEditMode } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  label: "Edit",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(enterMealEditMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);