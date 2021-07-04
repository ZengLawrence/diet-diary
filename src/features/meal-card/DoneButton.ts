import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { exitMealEditMode } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  label: "Done",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(exitMealEditMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);