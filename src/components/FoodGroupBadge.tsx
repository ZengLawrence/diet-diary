import _ from "lodash";
import { Badge } from "react-bootstrap";
import { FoodGroup, Serving } from "../model/Food";
import { backgroundColor } from "./backgroundColor";

export const FoodGroupBadge = (props: { foodGroup: FoodGroup; value: string | number | undefined; }) => {
  const { foodGroup, value } = props;
  const style: React.CSSProperties = {
    backgroundColor: backgroundColor(foodGroup),
    fontFamily: "Arial Narrow, Arial, sans-serif",
  };
  return (<Badge className="text-white m-1" style={style}>{value}</Badge>);
}

export const FoodGroupServingBadge = (props: { foodGroup: FoodGroup; serving: Serving; }) => {
  const { foodGroup, serving } = props;
  const value = _.get(serving, foodGroup);
  return (<FoodGroupBadge foodGroup={foodGroup} value={value} />);
}
