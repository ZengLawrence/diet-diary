import _ from "lodash";
import { connect } from "react-redux";
import { mealsSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { NameFoodForm } from "../../components/name-food-form/NameFoodForm";
import { Food, Meal } from "../../model/Food";
import { calcServingSummary } from "../../model/servingFunction";
import { exitMealEditMode, replaceAllFoods } from "./mealStatesSlice";

const combine = (meal: Meal) => ({
  name: _.join(_.map(meal.foods, "name"), ", "),
  serving: calcServingSummary(meal),
})

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number }) => ({
  food: combine(mealsSelector(state)[ownProps.mealIndex]),
})

const mapDispatchToProps = (dispatch: AppDispatch, { mealIndex }: { mealIndex: number }) => ({
  onSaveFood: (food: Food) => dispatch(replaceAllFoods({ mealIndex, food })),
  onCancel: () => dispatch(exitMealEditMode({ mealIndex })),
})

export default connect(mapStateToProps, mapDispatchToProps)(NameFoodForm);