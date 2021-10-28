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
  ["fluid ounce", "fl-oz"],
  ["fluid ounces", "fl-oz"],
])

function toUnit(s: string) {
  return UNIT_MAP.get(_.lowerCase(s));
}

function _parseRawUnit(unitText?: string) {
  const words = _.words(_.lowerCase(unitText));
  if (_.size(words) === 0) return "";
  const first = words[0];

  if ((first === "fluid") && _.size(words) > 1) {
    return first + " " + words[1];
  }
  return first;
}

function rawUnit(unitText?: string) {
  return {
    toUnit: _.partial(toUnit, _parseRawUnit(unitText)),
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