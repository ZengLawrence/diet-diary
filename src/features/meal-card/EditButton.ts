import { connect } from "react-redux";
import { enterFoodEditModeAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

const mapStateToProps = () => ({
  label: "Edit",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; foodIndex: number }) => ({
  onClick: () => dispatch(enterFoodEditModeAction(ownProps.mealIndex, ownProps.foodIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);