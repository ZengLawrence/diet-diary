import { connect } from "react-redux";
import { deleteMealAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { DangerButton } from "../../components/buttons/DangerButton";

const mapStateToProps = () => ({
  label: "Delete",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(deleteMealAction(ownProps.mealIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DangerButton);