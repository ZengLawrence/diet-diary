import { connect } from "react-redux";
import SavedMealCardsOffcanvas from "../../components/day-page/SavedMealCardsOffcanvas";
import { AppDispatch, RootState } from "../../app/store";
import { showSavedMealsSelector } from "../../app/selectors";
import { hide } from "./showSavedMealsSlice";

const mapStateToProps = (state: RootState) => ({
  show: showSavedMealsSelector(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(hide()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedMealCardsOffcanvas);