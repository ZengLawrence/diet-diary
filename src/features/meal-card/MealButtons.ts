import _ from "lodash";
import { connect } from "react-redux";
import { mealsSelector, mealStatesSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { MealButtons } from "../../components/meal-card/MealButtons";
import { Meal } from "../../model/Food";
import { enterMealEditMode, showSavedMealAlert } from "../day-page/mealStatesSlice";
import { save } from "../saved-meal/savedMealsSlice";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  editState: mealStatesSelector(state)[ownProps.mealIndex].editState,
  showNameButton: _.size(mealsSelector(state)[ownProps.mealIndex].foods) > 1,
  meal: mealsSelector(state)[ownProps.mealIndex],
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  editMeal: (mealIndex: number) => dispatch(enterMealEditMode({mealIndex})),
  saveMeal: (mealIndex: number, meal: Meal) => {
    dispatch(save(meal));
    dispatch(showSavedMealAlert(mealIndex));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MealButtons);
