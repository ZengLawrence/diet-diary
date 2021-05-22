import _ from "lodash";
import { FoodGroup } from "../model/Food";

const BACKGROUND_COLORS = {
  "vegetable": "green",
  "fruit": "teal",
  "carbohydrate": "cyan",
  "protein": "blue",
  "fat": "orange",
  "sweet": "red",
};

export type BadgeBackgroundColor = "green" | "teal" | "cyan"| "blue" | "orange" | "red" ;

export function backgroundColor(foodGroup: FoodGroup)  {
  return _.get(BACKGROUND_COLORS, foodGroup, '') as BadgeBackgroundColor;
}
