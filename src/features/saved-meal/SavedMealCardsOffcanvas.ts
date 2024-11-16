import _ from "lodash";
import { connect } from "react-redux";
import { savedMealsSelector, savedMealStateSelector, showSavedMealsSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import SavedMealCardsOffcanvas from "../../components/saved-meal/SavedMealCardsOffcanvas";
import { Food } from "../../model/Food";
import { hide } from "../day-page/showSavedMealsSlice";

function indexedMeals(meals: { foods: Food[] }[]) {
  return _.map(meals, (m, index) => ({ index: index, foods: m.foods }));
}

function hasTerm(meal: { foods: Food[] }, term: string): boolean {
  const found = _.find(meal.foods, food => food.description.includes(term));
  return found ? true : false;
}

function filterMeals(state: RootState) {
  const searchTerm = savedMealStateSelector(state).searchTerm;
  const meals = indexedMeals(savedMealsSelector(state));
  return _.filter(meals, m => hasTerm(m, searchTerm));
}

const mapStateToProps = (state: RootState) => ({
  show: showSavedMealsSelector(state),
  meals: filterMeals(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(hide()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedMealCardsOffcanvas);