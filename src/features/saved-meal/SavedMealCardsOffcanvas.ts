import _ from "lodash";
import { connect } from "react-redux";
import { savedMealsSelector, showSavedMealsSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import SavedMealCardsOffcanvas from "../../components/saved-meal/SavedMealCardsOffcanvas";
import { Food } from "../../model/Food";
import { hide } from "../day-page/showSavedMealsSlice";

function indexedMeals(meals: { foods: Food[] }[]) {
  return _.map(meals, (m, index) => ({ index: index, foods: m.foods }));
}

const mapStateToProps = (state: RootState) => ({
  show: showSavedMealsSelector(state),
  meals: indexedMeals(savedMealsSelector(state)),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(hide()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedMealCardsOffcanvas);