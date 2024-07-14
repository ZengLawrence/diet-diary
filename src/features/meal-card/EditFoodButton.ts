import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { enterFoodEditMode } from "../day-page/mealStatesSlice";
import { FoodButton } from "../../components/meal-card/FoodButton";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; foodIndex: number }) => ({
  onClick: () => dispatch(enterFoodEditMode(ownProps)),
})

export default connect(null, mapDispatchToProps)(FoodButton);
