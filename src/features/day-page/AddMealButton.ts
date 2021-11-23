import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addMeal } from "./mealStatesSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(addMeal()),
})

export default connect(null, mapDispatchToProps)(Button);
