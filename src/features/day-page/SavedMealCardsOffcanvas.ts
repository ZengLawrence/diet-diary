import _ from "lodash";
import { connect } from "react-redux";
import { savedMealsSelector, showSavedMealsSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import SavedMealCardsOffcanvas from "../../components/day-page/SavedMealCardsOffcanvas";
import { hide } from "./showSavedMealsSlice";

const mapStateToProps = (state: RootState) => ({
  show: showSavedMealsSelector(state),
  count: _.size(savedMealsSelector(state)),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(hide()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedMealCardsOffcanvas);