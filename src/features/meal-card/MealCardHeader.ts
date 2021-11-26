import { connect } from "react-redux";
import { mealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { MealCardHeader } from "../../components/meal-card/MealCardHeader";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  meal: mealsSelector(state)[ownProps.mealIndex],
})

export default connect(mapStateToProps)(MealCardHeader);
