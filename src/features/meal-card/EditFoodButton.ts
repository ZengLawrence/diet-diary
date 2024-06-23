import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { VariantPrimary } from "../../components/ButtonVariant";
import { enterFoodEditMode } from "../day-page/mealStatesSlice";
import { FoodButton } from "../../components/meal-card/FoodButton";

const mapStateToProps = () => ({
  variant: VariantPrimary,
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; foodIndex: number }) => ({
  onClick: () => dispatch(enterFoodEditMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodButton);
