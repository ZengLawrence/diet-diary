import _ from "lodash";
import { connect } from "react-redux";
import { mealsSelector, mealStatesSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { MealButtons } from "../../components/meal-card/MealButtons";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  editState: mealStatesSelector(state)[ownProps.mealIndex].editState,
  showNameButton: _.size(mealsSelector(state)[ownProps.mealIndex].foods) > 1,
})

export default connect(mapStateToProps)(MealButtons);
