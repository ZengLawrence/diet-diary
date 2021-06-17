import { connect } from "react-redux";
import { enterMealEditModelAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

const mapStateToProps = () => ({
  label: "Edit",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(enterMealEditModelAction(ownProps.mealIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);