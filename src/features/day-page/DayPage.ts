import _ from "lodash";
import { connect } from "react-redux";
import { editModeSelector, mealStatesSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import DayPage from "../../components/day-page/DayPage";
import { show } from "./showSavedMealsSlice";

const mapStateToProps = (state: RootState) => ({
  numberOfMeals: _.size(mealStatesSelector(state)),
  showButton: editModeSelector(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showSavedMeals: () => dispatch(show()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);