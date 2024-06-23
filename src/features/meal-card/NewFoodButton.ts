import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { enterMealAddMode } from "../day-page/mealStatesSlice";
import { MealButton } from "../../components/meal-card/MealButton";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; }) => ({
  onClick: () => dispatch(enterMealAddMode(ownProps)),
})

export default connect(null, mapDispatchToProps)(MealButton);
