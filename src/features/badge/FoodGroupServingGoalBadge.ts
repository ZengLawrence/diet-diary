import { connect } from "react-redux";
import { unlimitedFruitSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { FoodGroupServingGoalBadge } from "../../components/badge";

const mapStateToProps = (state: RootState) => ({
  unlimitedFruit: unlimitedFruitSelector(state),
})

export default connect(mapStateToProps)(FoodGroupServingGoalBadge);