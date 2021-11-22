import _ from "lodash";
import { connect } from "react-redux";
import { targetSelector, totalServingSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetAchievementIcon, TargetAction } from "../../components/summary/TargetAchievementIcon";
import { FoodGroup, Serving } from "../../model/Food";
import { isMinLimit, Target } from "../../model/Target";

function getAction(totalServing: Serving, foodGroup: FoodGroup, target: Target): TargetAction {
  const serving = _.defaultTo(_.get(totalServing, foodGroup), 0);
  const targetServing = _.defaultTo(_.get(target.serving, foodGroup), 0);

  if (serving > targetServing) {
    if (isMinLimit(foodGroup)) {
      return "MeetTarget";
    } else {
      return "DoLess";
    }
  }

  if (serving < targetServing) {
    return "DoMore";
  }

  return "MeetTarget"
}

const mapStateToProps = (state: RootState, ownProps: { foodGroup: FoodGroup }) => ({
  action: getAction(totalServingSelector(state), ownProps.foodGroup, targetSelector(state)),
})

export default connect(mapStateToProps)(TargetAchievementIcon);