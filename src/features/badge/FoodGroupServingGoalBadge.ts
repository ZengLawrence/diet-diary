import { connect } from "react-redux";
import { targetStateSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { FoodGroupServingGoalBadge } from "../../components/badge";

const mapStateToProps = (state: RootState) => ({
  unlimitedFruit: targetStateSelector(state).unlimitedFruit,
})

export default connect(mapStateToProps)(FoodGroupServingGoalBadge);