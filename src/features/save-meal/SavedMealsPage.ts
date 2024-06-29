import _ from "lodash";
import { connect } from "react-redux";
import { savedMealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { SavedMealsPage } from "../../components/saved-meal-page/SavedMealsPage";

const mapStateToProps = (state: RootState) => ({
  numberOfMeals: _.size(savedMealsSelector(state)),
})

export default connect(mapStateToProps)(SavedMealsPage);