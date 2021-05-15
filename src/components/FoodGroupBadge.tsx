import _ from "lodash";
import { Badge } from "react-bootstrap";
import { FoodGroup, Serving } from "../model/Food";
import { isMinLimit } from "../model/Goal";
import { backgroundColor } from "./backgroundColor";

export const FoodGroupBadge = (props: { foodGroup: FoodGroup; value: string | number | undefined; }) => {
  const { foodGroup, value } = props;
  const style: React.CSSProperties = {
    backgroundColor: backgroundColor(foodGroup),
    fontFamily: "Arial Narrow, Arial, sans-serif",
  };
  return (<Badge className="text-white m-1" style={style}>{value}</Badge>);
}

export const FoodGroupServingBadge = (props: { foodGroup: FoodGroup; serving: Serving; goal?: boolean }) => {
  const { foodGroup, serving, goal } = props;
  const value = _.get(serving, foodGroup);
  const displayValue = (goal && isMinLimit(foodGroup)) ? value + "+" : value;
  return (<FoodGroupBadge foodGroup={foodGroup} value={displayValue} />);
}
