import _ from "lodash";
import { connect } from "react-redux";
import { savedMealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { SavedMealCards } from "../../components/saved-meal/SavedMealCards";
import { Food } from "../../model/Food";

function indexedMeals(meals: { foods: Food[] }[]) {
  return _.map(meals, (m, index) => { return { index: index, foods: m.foods }; });
}

const mapStateToProps = (state: RootState) => ({
  meals: indexedMeals(savedMealsSelector(state)),
})

export default connect(mapStateToProps)(SavedMealCards);