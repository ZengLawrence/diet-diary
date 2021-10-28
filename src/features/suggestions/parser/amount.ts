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
  const lowerCaseStr = _.lowerCase(s);
  return _.defaultTo(UNIT_MAP.get(lowerCaseStr), lowerCaseStr);
}

export function parseAmount(amount: string) {
  const { quantity,  unit } = parseFoodDescription(mockFoodDescription(amount));
  return {
    quantity: quantity || 0,
    unit: toUnit(_.head(_.words(unit)) || "") || "",
  };
}