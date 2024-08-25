import { connect } from "react-redux";
import { savedMealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { MealCardHeader } from "../../components/saved-meal/MealCardHeader";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  meal: savedMealsSelector(state)[ownProps.mealIndex],
})

export default connect(mapStateToProps)(MealCardHeader);
