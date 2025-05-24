import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { FoodButton } from "../../components/meal-card/FoodButton";
import { enterFoodEditMode } from "../day-page/pageOptionsSlice";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; foodIndex: number }) => ({
  onClick: () => dispatch(enterFoodEditMode(ownProps)),
})

export default connect(null, mapDispatchToProps)(FoodButton);
