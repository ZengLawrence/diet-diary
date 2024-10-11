import { connect } from "react-redux";
import { savedMealsSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { MealCardHeader } from "../../components/saved-meal/MealCardHeader";
import { Food } from "../../model/Food";
import { addSavedMeal } from "../day-page/mealStatesSlice";
import { removeSuggestion } from "../suggestions/SavedMealSuggestion";
import { remove, select } from "./savedMealsSlice";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  meal: savedMealsSelector(state)[ownProps.mealIndex],
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectMeal: (mealIndex: number, meal: { foods: Food[]; }) => {
    dispatch(addSavedMeal(meal));
    dispatch(select(mealIndex));
  },
  deleteMeal: (mealIndex: number, meal: { foods: Food[]; }) => {
    dispatch(remove(mealIndex));
    removeSuggestion(meal);
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MealCardHeader);
