import _ from "lodash";
import { AppState } from "../../model/AppState";
import { calcMealsServingSummary } from "../../model/servingFunction";
import { connect } from "react-redux";
import { CompactServingSummary } from "../../components/summary/CompactServingSummary";

const mapStateToProps = (state: AppState) => ({
  serving: calcMealsServingSummary(_.map(state.mealStates, 'meal')),
})

export default connect(mapStateToProps)(CompactServingSummary);