import { connect } from "react-redux";
import { CalorieServingPanel } from "../../components/panels/CalorieServingPanel";
import { calcFoodCalories } from "../../model/calorieFunction";
import { Food } from "../../model/Food";

const mapStateToProps = (_state: any, ownProps: { food: Food; }) => ({
  calorie: calcFoodCalories(ownProps.food),
  serving: ownProps.food.serving,
})

export default connect(mapStateToProps)(CalorieServingPanel);