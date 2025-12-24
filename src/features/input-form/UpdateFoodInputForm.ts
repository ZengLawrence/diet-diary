import { connect } from "react-redux";
import type { AppDispatch } from "../../app/store";
import type { ButtonLabel} from "../../components/input-form/FoodInputForm";
import { FoodInputForm } from "../../components/input-form/FoodInputForm";
import type { Food } from "../../model/Food";
import { exitFoodEditMode } from "../day-page/pageOptionsSlice";
import { deleteFood, updateFood } from "../day-page/dayPageSlice";

const mapStateToProps = () => ({
  buttonLabel: "Update" as ButtonLabel,
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; foodIndex: number; }) => {
  const { mealIndex, foodIndex } = ownProps;
  return {
    onSaveFood: (food: Food) => {
      void dispatch(updateFood({ mealIndex, foodIndex, food }));
      void dispatch(exitFoodEditMode());
    },
    onCancel: () => void dispatch(exitFoodEditMode()),
    onDeleteFood: () => void dispatch(deleteFood({ mealIndex, foodIndex })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodInputForm);