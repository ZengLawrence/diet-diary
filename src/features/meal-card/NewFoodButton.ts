import { connect } from "react-redux";
import { enterMealAddModeAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { AddButton } from "../../components/buttons/AddButton";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; }) => ({
  onClick: () => dispatch(enterMealAddModeAction(ownProps.mealIndex)),
})

export default connect(null, mapDispatchToProps)(AddButton);