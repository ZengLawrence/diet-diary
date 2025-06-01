import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { MealCardHeader } from "../../components/saved-meal/MealCardHeader";
import { Food } from "../../model/Food";
import { addSavedMeal } from "../day-page/todaySlice";
import { removeSuggestion } from "../suggestions/SavedMealSuggestion";
import { remove, select } from "./savedMealsSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectMeal: (meal: { index: number; foods: Food[]; }) => {
    dispatch(addSavedMeal(meal));
    dispatch(select(meal.index));
  },
  deleteMeal: (meal: { index: number; foods: Food[]; }) => {
    dispatch(remove(meal.index));
    removeSuggestion(meal);
  },
})

export default connect(null, mapDispatchToProps)(MealCardHeader);
