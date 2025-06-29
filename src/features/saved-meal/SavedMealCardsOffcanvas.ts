import _ from "lodash";
import { connect } from "react-redux";
import { showSavedMealsSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import SavedMealCardsOffcanvas from "../../components/saved-meal/SavedMealCardsOffcanvas";
import { hide } from "../day-page/showSavedMealsSlice";


const mapStateToProps = (state: RootState) => ({
  show: showSavedMealsSelector(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(hide()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedMealCardsOffcanvas);