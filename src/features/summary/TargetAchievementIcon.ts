import _ from "lodash";
import { connect } from "react-redux";
import { targetSelector, totalServingSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetAchievementIcon, TargetAction } from "../../components/summary/TargetAchievementIcon";
import { FoodGroup, Serving } from "../../model/Food";
import { isMinLimit } from "../../model/Target";

function getServingForFoodGroup(serving: Serving, foodGroup: FoodGroup) {
  return _.defaultTo(_.get(serving, foodGroup), 0);
}

function getToTarget(serving: number, targetServing: number) {

  if (serving > targetServing) {
    return "more"
  }

  if (serving < targetServing) {
    return "less";
  }

  return "same";
}

type ToTarget = ReturnType<typeof getToTarget>;

function getAction(toTarget: ToTarget, foodGroup: FoodGroup): TargetAction {

  if (toTarget === "more") {
    if (isMinLimit(foodGroup)) {
      return "MeetTarget";
    } else {
      return "DoLess";
    }
  }

  if (toTarget === "less") {
    if (foodGroup === "sweet") return "MeetTarget";
    return "DoMore";
  }

  if (foodGroup === "sweet") return "DoLess";
  return "MeetTarget"
}

const mapStateToProps = (state: RootState, ownProps: { foodGroup: FoodGroup }) => {
  const { foodGroup } = ownProps;
  const serving = getServingForFoodGroup(totalServingSelector(state), foodGroup);
  const targetServing = getServingForFoodGroup(targetSelector(state).serving, foodGroup);
  const toTarget = getToTarget(serving, targetServing);
  const action = getAction(toTarget, foodGroup);
  return {
    action,
  }
}

export default connect(mapStateToProps)(TargetAchievementIcon);