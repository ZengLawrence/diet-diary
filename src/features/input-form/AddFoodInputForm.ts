import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { ButtonLabel, FoodInputForm } from "../../components/input-form/FoodInputForm";
import { Food, newFood } from "../../model/Food";
import { exitFoodAddMode } from "../day-page/pageOptionsSlice";
import { addFood } from "../day-page/dayPageSlice";

const mapStateToProps = () => ({
  food: newFood(),
  buttonLabel: "Add" as ButtonLabel,
})

const mapDispatchToProps = (dispatch: AppDispatch, { mealIndex }: { mealIndex: number }) => ({
  onSaveFood: (food: Food) => dispatch(addFood({ mealIndex, food })),
  onCancel: () => dispatch(exitFoodAddMode()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodInputForm);