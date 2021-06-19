import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { FoodGroupServingGoalBadgePanel } from "../../components/badge/FoodGroupServingGoalBadgePanel";

const mapStateToProps = (state: RootState) => ({
  serving: state.target.serving,
})

export default connect(mapStateToProps)(FoodGroupServingGoalBadgePanel);