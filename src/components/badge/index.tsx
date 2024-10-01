import _ from "lodash";
import { abbreviation, FoodGroup, Serving } from "../../model/Food";
import { displayServingValue } from "../../model/servingFunction";
import { isMinLimit } from "../../model/Target";

const backgroundColorCss = (foodGroup: FoodGroup) => {
  return "dd-bg-" + (foodGroup == "proteinDiary" ? "protein-diary" : foodGroup);
}

const FoodGroupBadge = (props: { foodGroup: FoodGroup; value: string | number | undefined; }) => (
  <span className={backgroundColorCss(props.foodGroup) + " badge mx-1"}>{props.value}</span>
)

export const FoodGroupLabelBadge = (props: { foodGroup: FoodGroup; }) => (
  <FoodGroupBadge foodGroup={props.foodGroup} value={abbreviation(props.foodGroup)} />
)

export const FoodGroupServingBadge = (props: { foodGroup: FoodGroup; serving: Serving; }) => {
  const { foodGroup, serving } = props;
  const displayValue = displayServingValue(_.get(serving, foodGroup))
  return (<FoodGroupBadge foodGroup={foodGroup} value={displayValue} />);
}

export const FoodGroupServingGoalBadge = (props: { foodGroup: FoodGroup; serving: Serving;}) => {
  const { foodGroup, serving } = props;
  const value = _.get(serving, foodGroup);
  const displayValue = isMinLimit(foodGroup) ? value + "+" : value;
  return (<FoodGroupBadge foodGroup={foodGroup} value={displayValue} />);
}
