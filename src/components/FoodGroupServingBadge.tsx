import _ from "lodash";
import { Badge } from "react-bootstrap";
import { Serving } from "../model/Food";

type FoodGroup = "vegetable" | "fruit" | "carbohydrate" | "protein" | "fat" | "sweeet";

const BACKGROUND_COLORS = {
  "vegetable": "green",
  "fruit": "teal",
  "carbohydrate": "cyan",
  "protein": "blue",
  "fat": "orange",
  "sweeet": "red",
};

function backgroundColor(foodGroup: FoodGroup) {
  return _.get(BACKGROUND_COLORS, foodGroup, '');
}

export const FoodGroupServingBadge = (props: { foodGroup: FoodGroup; serving: Serving; }) => {
  const { foodGroup, serving } = props;
  const style: React.CSSProperties = {
    backgroundColor: backgroundColor(foodGroup)
  };
  return (<Badge className="text-white m-1" style={style}>{_.get(serving, foodGroup)}</Badge>);
};
