import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { FoodGroupServingGoalBadgePanel } from "../../components/panels/FoodGroupServingGoalBadgePanel";

const mapStateToProps = (state: RootState) => ({
  serving: targetSelector(state).serving,
})

export default connect(mapStateToProps)(FoodGroupServingGoalBadgePanel);