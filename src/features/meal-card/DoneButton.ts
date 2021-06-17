import { connect } from "react-redux";
import { exitMealEditModeAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

const mapStateToProps = () => ({
  label: "Done",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(exitMealEditModeAction(ownProps.mealIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);