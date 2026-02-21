import { connect } from "react-redux";
import { overlaysSelector } from "../../app/selectors";
import type { AppDispatch, RootState } from "../../app/store";
import SavedMealCardsOffcanvas from "../../components/saved-meal/SavedMealCardsOffcanvas";
import { closeSavedMeals } from "../overlays/overlaysSlice";

const mapStateToProps = (state: RootState) => ({
  show: overlaysSelector(state).showType == "savedMeals",
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(closeSavedMeals()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedMealCardsOffcanvas);