import _ from "lodash";
import { parseFoodDescription } from "./foodDescription";

function mockFoodDescription(amount: string) {
  // add food name to make a food description
  return "food " + amount;
}

const UNIT_MAP = new Map([
  ["cup", "cup"],
  ["pound", "lb"],
  ["ounce", "oz"],
  ["ounces", "oz"],
])

function toUnit(s: string) {
  const unit = UNIT_MAP.get(_.lowerCase(s));
  return unit ? unit : _.lowerCase(s);
}

export function parseAmount(amount: string) {
  const { quantity,  unit } = parseFoodDescription(mockFoodDescription(amount));
  const rawUnit = _.head(_.words(unit)) || "";
  return {
    quantity: quantity || 0,
    unit: toUnit(rawUnit),
  };
}