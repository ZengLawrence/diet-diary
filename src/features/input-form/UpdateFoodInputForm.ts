import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { ButtonLabel, FoodInputForm } from "../../components/input-form/FoodInputForm";
import { Food } from "../../model/Food";
import { deleteFood, exitFoodEditMode, updateFood } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  buttonLabel: "Update" as ButtonLabel,
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; foodIndex: number; }) => {
  const { mealIndex, foodIndex } = ownProps;
  return {
    onSaveFood: (food: Food) => {
      dispatch(updateFood({ mealIndex, foodIndex, food }));
      dispatch(exitFoodEditMode({ mealIndex }));
    },
    onCancel: () => dispatch(exitFoodEditMode({ mealIndex })),
    onDeleteFood: () => dispatch(deleteFood({ mealIndex, foodIndex })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodInputForm);