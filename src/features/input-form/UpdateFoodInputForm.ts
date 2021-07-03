import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { ButtonLabel, FoodInputForm } from "../../components/input-form/FoodInputForm";
import { Food } from "../../model/Food";
import { exitFoodEditMode, updateFood } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  buttonLabel: "Update" as ButtonLabel,
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { food: Food; mealIndex: number; foodIndex: number; }) => ({
  onSaveFood: (food: Food) => {
    dispatch(updateFood({...ownProps, food}));
    dispatch(exitFoodEditMode(ownProps));
  },
  onCancel: () => dispatch(exitFoodEditMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodInputForm);