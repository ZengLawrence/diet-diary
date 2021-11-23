import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { enterMealNameMode } from "../day-page/mealStatesSlice";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(enterMealNameMode(ownProps)),
})

export default connect(null, mapDispatchToProps)(Button);
