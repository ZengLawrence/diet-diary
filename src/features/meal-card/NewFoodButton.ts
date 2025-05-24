import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { NewFoodButton } from "../../components/meal-card/NewFoodButton";
import { enterMealAddMode } from "../day-page/pageOptionsSlice";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; }) => ({
  onClick: () => dispatch(enterMealAddMode(ownProps)),
})

export default connect(null, mapDispatchToProps)(NewFoodButton);
