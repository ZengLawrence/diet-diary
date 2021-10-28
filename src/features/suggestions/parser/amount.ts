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

function rawUnit(unitText?: string) {
  const _rawUnit = _.head(_.words(unitText)) || "";
  return {
    toUnit: _.partial(toUnit, _rawUnit),
  }
}

export function parseAmount(amount: string) {
  const { quantity, unitText } = parseFoodDescription(mockFoodDescription(amount));
  return {
    quantity: quantity || 0,
    unit: rawUnit(unitText).toUnit(),
  };
}

export type Amount = ReturnType<typeof parseAmount>;