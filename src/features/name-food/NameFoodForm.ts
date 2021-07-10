import { connect } from "react-redux";
import { mealsSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { NameFoodForm } from "../../components/name-food-form/NameFoodForm";
import { Food } from "../../model/Food";
import { exitMealEditMode, replaceFoods } from "../day-page/mealStatesSlice";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number }) => ({
  foods: mealsSelector(state)[ownProps.mealIndex].foods,
})

const mapDispatchToProps = (dispatch: AppDispatch, { mealIndex }: { mealIndex: number }) => ({
  onSaveFood: (food: Food, replacedFoodIndices: number[]) => dispatch(replaceFoods({ mealIndex, food, replacedFoodIndices })),
  onCancel: () => dispatch(exitMealEditMode({ mealIndex })),
})

export default connect(mapStateToProps, mapDispatchToProps)(NameFoodForm);