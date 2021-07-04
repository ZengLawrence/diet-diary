import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { enterFoodEditMode } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  label: "Edit",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; foodIndex: number }) => ({
  onClick: () => dispatch(enterFoodEditMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);