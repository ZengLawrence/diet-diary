import _ from "lodash";
import { connect } from "react-redux";
import { targetSelector, totalServingSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetActionIcon, TargetAction } from "../../components/summary/TargetActionIcon";
import { FoodGroup, Serving } from "../../model/Food";
import { isMinLimit } from "../../model/Target";

function servingForFoodGroup(serving: Serving, foodGroup: FoodGroup) {
  return _.defaultTo(_.get(serving, foodGroup), 0);
}

function compare(serving: number, targetServing: number) {

  if (serving > targetServing) {
    return "more"
  }

  if (serving < targetServing) {
    return "less";
  }

  return "same";
}

type ToTarget = ReturnType<typeof compare>;

function translateToTargetAction(toTarget: ToTarget, foodGroup: FoodGroup): TargetAction {

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
  const serving = servingForFoodGroup(totalServingSelector(state), foodGroup);
  const targetServing = servingForFoodGroup(targetSelector(state).serving, foodGroup);
  const toTarget = compare(serving, targetServing);
  const action = translateToTargetAction(toTarget, foodGroup);
  const eatLessWarning = (foodGroup === "sweet" && toTarget === "more");
  return {
    action,
    eatLessWarning,
  }
}

export default connect(mapStateToProps)(TargetActionIcon);