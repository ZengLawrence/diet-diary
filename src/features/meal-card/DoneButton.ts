import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { exitMealEditMode } from "../day-page/mealStatesSlice";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(exitMealEditMode(ownProps)),
})

export default connect(null, mapDispatchToProps)(Button);
