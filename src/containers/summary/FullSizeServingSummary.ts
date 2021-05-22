import _ from "lodash";
import { FullSizeServingSummary } from "../../components/summary/FullSizeServingSummary";
import { AppState } from "../../model/AppState";
import { calcMealsServingSummary } from "../../model/servingFunction";
import { connect } from "react-redux";

const mapStateToProps = (state: AppState) => ({
  serving: calcMealsServingSummary(_.map(state.mealStates, 'meal')),
})

export default connect(mapStateToProps)(FullSizeServingSummary);