import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { DangerButton } from "../../components/buttons/DangerButton";
import { deleteMeal } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  label: "Delete",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(deleteMeal(ownProps.mealIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DangerButton);