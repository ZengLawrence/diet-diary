import _ from "lodash";
import { Badge } from "react-bootstrap";
import { FoodGroup, Serving } from "../model/Food";

const BACKGROUND_COLORS = {
  "vegetable": "green",
  "fruit": "teal",
  "carbohydrate": "cyan",
  "protein": "blue",
  "fat": "orange",
  "sweet": "red",
};

function backgroundColor(foodGroup: FoodGroup) {
  return _.get(BACKGROUND_COLORS, foodGroup, '');
}

export const FoodGroupServingBadge = (props: { foodGroup: FoodGroup; serving: Serving; }) => {
  const { foodGroup, serving } = props;
  const style: React.CSSProperties = {
    backgroundColor: backgroundColor(foodGroup),
    fontFamily: "Arial Narrow, Arial, sans-serif",
  };
  return (<Badge className="text-white m-1" style={style}>{_.get(serving, foodGroup)}</Badge>);
};
