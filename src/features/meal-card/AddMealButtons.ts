import { connect } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { AddMealButtons } from "../../components/meal-card/AddMealButtons";
import { openSavedMeals } from "../overlays/overlaysSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showSavedMeals: () => dispatch(openSavedMeals()),
})

export default connect(null, mapDispatchToProps)(AddMealButtons);