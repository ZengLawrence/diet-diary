import { Mass, Volume } from "convert-units";
import _ from "lodash";
import { parseFoodDescription } from "./foodDescription";

function mockFoodDescription(amount: string) {
  // add food name to make a food description
  return "food " + amount;
}

const UNIT_MAP = new Map<string, (Mass | Volume)>([
  ["cup", "cup"],
  ["pound", "lb"],
  ["ounce", "oz"],
  ["ounces", "oz"],
])

function toUnit(s: string) {
  return UNIT_MAP.get(_.lowerCase(s));
}

export function parseAmount(amount: string) {
  const { quantity, unitText } = parseFoodDescription(mockFoodDescription(amount));
  const rawUnit = _.head(_.words(unitText)) || "";
  return {
    quantity: quantity || 0,
    unit: toUnit(rawUnit),
  };
}

export type Amount = ReturnType<typeof parseAmount>;