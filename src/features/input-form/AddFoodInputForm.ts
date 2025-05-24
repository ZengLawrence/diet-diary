import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { ButtonLabel, FoodInputForm } from "../../components/input-form/FoodInputForm";
import { Food, newFood } from "../../model/Food";
import { addFood } from "../day-page/mealStatesSlice";
import { exitFoodAddMode } from "../day-page/pageOptionsSlice";

const mapStateToProps = () => ({
  food: newFood(),
  buttonLabel: "Add" as ButtonLabel,
})

const mapDispatchToProps = (dispatch: AppDispatch, { mealIndex }: { mealIndex: number }) => ({
  onSaveFood: (food: Food) => dispatch(addFood({ mealIndex, food })),
  onCancel: () => dispatch(exitFoodAddMode()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodInputForm);