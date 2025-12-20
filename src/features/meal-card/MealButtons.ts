import { connect } from "react-redux";
import { mealStatesSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { MealButtons } from "../../components/meal-card/MealButtons";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  editState: mealStatesSelector(state)[ownProps.mealIndex].editState,
})

export default connect(mapStateToProps)(MealButtons);
