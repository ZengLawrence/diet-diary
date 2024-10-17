import { connect } from "react-redux";
import SavedMealCardsOffcanvas from "../../components/day-page/SavedMealCardsOffcanvas";
import { AppDispatch, RootState } from "../../app/store";
import { savedMealsSelector, showSavedMealsSelector } from "../../app/selectors";
import { hide } from "./showSavedMealsSlice";
import _ from "lodash";

const mapStateToProps = (state: RootState) => ({
  show: showSavedMealsSelector(state),
  count: _.size(savedMealsSelector(state)),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(hide()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedMealCardsOffcanvas);