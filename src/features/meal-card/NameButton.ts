import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { SecondaryButton } from "../../components/buttons/SecondaryButton";
import { enterMealNameMode } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  label: "Name",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(enterMealNameMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryButton);