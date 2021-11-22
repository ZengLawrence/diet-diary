import _ from "lodash";
import { connect } from "react-redux";
import { targetSelector, totalServingSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetAchievementIcon, TargetAction } from "../../components/summary/TargetAchievementIcon";
import { FoodGroup, Serving } from "../../model/Food";
import { Target } from "../../model/Target";

function getAction(totalServing: Serving, foodGroup: FoodGroup, target: Target): TargetAction {
  const serving = _.defaultTo(_.get(totalServing, foodGroup), 0);
  const targetServing = _.defaultTo(_.get(target.serving, foodGroup), 0);
  if (serving > targetServing) {
    return "DoLess";
  } else if (serving < targetServing) {
    return "DoMore";
  } else {
    return "MeetTarget"
  }
}

const mapStateToProps = (state: RootState, ownProps: { foodGroup: FoodGroup }) => ({
  action: getAction(totalServingSelector(state), ownProps.foodGroup, targetSelector(state)),
})

export default connect(mapStateToProps)(TargetAchievementIcon);