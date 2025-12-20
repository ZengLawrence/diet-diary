import { connect } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { AddMealButtons } from "../../components/meal-card/AddMealButtons";
import { show } from "../day-page/showSavedMealsSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showSavedMeals: () => dispatch(show()),
})

export default connect(null, mapDispatchToProps)(AddMealButtons);