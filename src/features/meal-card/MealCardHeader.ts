import { connect } from "react-redux";
import { editModeSelector, mealsSelector, mealStatesSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { MealCardHeader } from "../../components/meal-card/MealCardHeader";

function showShowDeleteButton(state: RootState, mealIndex: number) {
  const mealState = mealStatesSelector(state)[mealIndex];
  return editModeSelector(state) &&
    (mealState.editState === "add" || mealState.editState === "edit");
}

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  meal: mealsSelector(state)[ownProps.mealIndex],
  showButton: editModeSelector(state),
  showDeleteButton: showShowDeleteButton(state, ownProps.mealIndex),
})

export default connect(mapStateToProps)(MealCardHeader);
