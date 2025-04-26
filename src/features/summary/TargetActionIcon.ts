import _ from "lodash";
import { connect } from "react-redux";
import { targetSelector, totalServingSelector, unlimitedFruitSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetAction, TargetActionIcon } from "../../components/summary/TargetActionIcon";
import { FoodGroup, Serving } from "../../model/Food";
import { isMinLimit } from "../target/isMinLimit";

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

function translateToTargetAction(toTarget: ToTarget, foodGroup: FoodGroup, unlimitedFruit: boolean): TargetAction {

  if (toTarget === "more") {
    if (isMinLimit(foodGroup, unlimitedFruit)) {
      return "MeetTarget";
    } else {
      return "DoLess";
    }
  }

  if (toTarget === "less") {
    if (foodGroup === "sweet") return "MeetTarget";
    return "DoMore";
  }

  return "MeetTarget"
}

const mapStateToProps = (state: RootState, ownProps: { foodGroup: FoodGroup }) => {
  const { foodGroup } = ownProps;
  const serving = servingForFoodGroup(totalServingSelector(state), foodGroup);
  const targetServing = servingForFoodGroup(targetSelector(state).serving, foodGroup);
  const toTarget = compare(serving, targetServing);
  const action = translateToTargetAction(toTarget, foodGroup, unlimitedFruitSelector(state));
  const eatLessWarning = (foodGroup === "sweet" && toTarget === "more");
  return {
    action,
    eatLessWarning,
  }
}

export default connect(mapStateToProps)(TargetActionIcon);