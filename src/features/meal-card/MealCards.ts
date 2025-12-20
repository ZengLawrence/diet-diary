import _ from "lodash";
import { connect } from "react-redux";
import { mealStatesSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { MealCards } from "../../components/meal-card/MealCards";

const mapStateToProps = (state: RootState) => ({
  numberOfMeals: _.size(mealStatesSelector(state)),
})

export default connect(mapStateToProps)(MealCards);