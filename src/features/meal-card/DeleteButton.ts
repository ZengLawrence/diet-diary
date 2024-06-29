import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { deleteMeal } from "../day-page/mealStatesSlice";
import { MealButton } from "../../components/meal-card/MealButton";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(deleteMeal(ownProps.mealIndex)),
})

export default connect(null, mapDispatchToProps)(MealButton);
