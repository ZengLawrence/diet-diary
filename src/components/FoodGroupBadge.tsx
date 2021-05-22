import _ from "lodash";
import { Badge } from "react-bootstrap";
import { FoodGroup, Serving } from "../model/Food";
import { isMinLimit } from "../model/Target";
import { backgroundColor, BadgeBackgroundColor } from "./backgroundColor";

const fontFamily = "Arial Narrow, Arial, sans-serif";

const LabelBadge = (props: { backgroundColor: BadgeBackgroundColor; value: string | number | undefined; }) => {
  const { backgroundColor, value } = props;
  const style: React.CSSProperties = {
    backgroundColor,
    fontFamily,
  };
  return (<Badge className="text-white m-1" style={style}>{value}</Badge>);
}

export const InfoLabelBadge = (props: { value: string; }) => (
  <Badge className="bg-light m-1" style={{ fontFamily }}>{props.value}</Badge>
);

export const FoodGroupBadge = (props: { foodGroup: FoodGroup; value: string | number | undefined; }) => (
  <LabelBadge backgroundColor={backgroundColor(props.foodGroup)} value={props.value} />
)

export const FoodGroupServingBadge = (props: { foodGroup: FoodGroup; serving: Serving; goal?: boolean }) => {
  const { foodGroup, serving, goal } = props;
  const value = _.get(serving, foodGroup);
  const displayValue = (goal && isMinLimit(foodGroup)) ? value + "+" : value;
  return (<FoodGroupBadge foodGroup={foodGroup} value={displayValue} />);
}
