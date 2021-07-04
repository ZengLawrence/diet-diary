import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { FoodGroupServingGoalBadgePanel } from "../../components/panels/FoodGroupServingGoalBadgePanel";

const mapStateToProps = (state: RootState) => ({
  serving: state.target.serving,
})

export default connect(mapStateToProps)(FoodGroupServingGoalBadgePanel);