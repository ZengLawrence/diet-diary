import { connect } from "react-redux";
import type { AppDispatch } from "../../app/store";
import type { ButtonLabel} from "../../components/input-form/FoodInputForm";
import { FoodInputForm } from "../../components/input-form/FoodInputForm";
import type { Food} from "../../model/Food";
import { newFood } from "../../model/Food";
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