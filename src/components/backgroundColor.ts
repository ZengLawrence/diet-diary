import _ from "lodash";
import { FoodGroup } from "../model/Food";

const BACKGROUND_COLORS = {
  "vegetable": "darkgreen",
  "fruit": "yellowgreen",
  "carbohydrate": "deepskyblue",
  "proteinDiary": "royalblue",
  "fat": "orange",
  "sweet": "red",
};

export type BadgeBackgroundColor = "green" | "teal" | "cyan"| "blue" | "orange" | "red" | "darkgreen" | "yellowgreen" | "royalblue" | "deepskyblue";

export function backgroundColor(foodGroup: FoodGroup)  {
  return _.get(BACKGROUND_COLORS, foodGroup, '') as BadgeBackgroundColor;
}
