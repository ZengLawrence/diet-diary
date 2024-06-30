import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { CalorieServingPanel } from "../../components/panels/CalorieServingPanel";
import { calcMealCalories } from "../../model/calorieFunction";
import { Food } from "../../model/Food";
import { calcServingSummary } from "../../model/servingFunction";

const mapStateToProps = (_state: RootState, ownProps: { meal: {foods: Food[];} }) => ({
  calorie: calcMealCalories(ownProps.meal),
  serving: calcServingSummary(ownProps.meal),
})

export default connect(mapStateToProps)(CalorieServingPanel);