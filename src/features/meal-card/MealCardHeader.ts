import { connect } from "react-redux";
import { mealsSelector, mealStatesSelector, viewOptionsSelector } from "../../app/selectors";
import type { AppDispatch, RootState } from "../../app/store";
import { MealCardHeader } from "../../components/meal-card/MealCardHeader";
import type { Meal } from "../../model/Food";
import { enterMealEditMode, exitMealEditMode, hideSavedMealAlert, showSavedMealAlert } from "../day-page/pageOptionsSlice";
import { deleteMeal } from "../day-page/dayPageSlice";
import { savedMeals } from "../saved-meal";

function inAddOrEditState(state: RootState, mealIndex: number) {
  const mealState = mealStatesSelector(state)[mealIndex];
  return viewOptionsSelector(state).canEdit &&
    (mealState.editState === "add" || mealState.editState === "edit");
}

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  meal: mealsSelector(state)[ownProps.mealIndex],
  showButton: viewOptionsSelector(state).canEdit,
  showDeleteButton: inAddOrEditState(state, ownProps.mealIndex),
  showMealSavedAlert: mealStatesSelector(state)[ownProps.mealIndex].showMealSavedAlert,
  showWarningAlert: inAddOrEditState(state, ownProps.mealIndex),
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; }) => ({
  hideMealSavedAlert: () => dispatch(hideSavedMealAlert()),
  deleteMeal: () => dispatch(deleteMeal(ownProps.mealIndex)),
  editMeal: (mealIndex: number) => dispatch(enterMealEditMode({ mealIndex })),
  doneEdit: () => dispatch(exitMealEditMode()),
  saveMeal: (mealIndex: number, meal: Meal) => {
    savedMeals.add(meal);
    dispatch(showSavedMealAlert(mealIndex));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MealCardHeader);
