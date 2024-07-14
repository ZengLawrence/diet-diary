import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { enterMealAddMode } from "../day-page/mealStatesSlice";
import { NewMealButton } from "../../components/meal-card/NewMealButton";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; }) => ({
  onClick: () => dispatch(enterMealAddMode(ownProps)),
})

export default connect(null, mapDispatchToProps)(NewMealButton);
