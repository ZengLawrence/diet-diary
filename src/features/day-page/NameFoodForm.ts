import _ from "lodash";
import { connect } from "react-redux";
import { mealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { NameFoodForm } from "../../components/name-food-form/NameFoodForm";
import { Meal } from "../../model/Food";
import { calcServingSummary } from "../../model/servingFunction";

const combine = (meal: Meal) => ({
  name: _.join(_.map(meal.foods, "name"), ", "),
  serving: calcServingSummary(meal),
})

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number }) => ({
  food: combine(mealsSelector(state)[ownProps.mealIndex]),
})

export default connect(mapStateToProps)(NameFoodForm);