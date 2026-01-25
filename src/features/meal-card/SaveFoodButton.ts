import { connect } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { FoodButton } from "../../components/meal-card/FoodButton";
import { saveFood } from "../day-page/dayPageSlice";

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; foodIndex: number }) => ({
  onClick: () => dispatch(saveFood(ownProps)),
})

export default connect(null, mapDispatchToProps)(FoodButton);
