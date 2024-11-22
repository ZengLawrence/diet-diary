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

function includesAllWords(meal: { foods: Food[] }, searchTerm: string) {
  const foodDescriptions = _.map(meal.foods, f => _.lowerCase(f.description));
  const wordIncludedInFoodDescription = (word: string) => foodDescriptions.some(desc => desc.includes(word));
  return _.words(_.lowerCase(searchTerm)).every(wordIncludedInFoodDescription);
}

function filterMeals(state: RootState) {
  const searchTerm = savedMealStateSelector(state).searchTerm;
  const meals = indexedMeals(savedMealsSelector(state));
  return _.filter(meals, m => includesAllWords(m, searchTerm));
}

const mapStateToProps = (state: RootState) => ({
  show: showSavedMealsSelector(state),
  meals: filterMeals(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(hide()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedMealCardsOffcanvas);