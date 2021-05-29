import { connect } from "react-redux";
import { exitFoodEditModeAction, updateFoodAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { FoodInputForm } from "../../components/input-form/FoodInputForm";
import { Food } from "../../model/Food";

const mapStateToProps = () => ({
  buttonLabel: "Update",
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { food: Food; mealIndex: number; foodIndex: number; }) => ({
  onAddFood: (food: Food) => {
    dispatch(updateFoodAction(ownProps.mealIndex, ownProps.foodIndex, food));
    dispatch(exitFoodEditModeAction(ownProps.mealIndex));
  },
  onCancel: () => dispatch(exitFoodEditModeAction(ownProps.mealIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodInputForm);