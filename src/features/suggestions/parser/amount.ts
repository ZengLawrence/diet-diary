import _ from "lodash";
import parseFoodDescription from "./foodDescription";
import { toUnit } from "../../../model/Unit";

function mockFoodDescription(amount: string) {
  // add food name to make a food description
  return "food " + amount;
}

function _parseRawUnit(unitText?: string) {
  const words = _.words(_.lowerCase(unitText));
  if (_.size(words) === 0) return "";
  const first = words[0];

  if ((["fluid", "fl"].includes(first)) && _.size(words) > 1) {
    return first + " " + words[1];
  }
  return first;
}

function rawUnit(unitText?: string) {
  return {
    toUnit: _.partial(toUnit, _parseRawUnit(unitText)),
  }
}

function compose(quantityText: string | undefined, unitText: string) {
  return quantityText + " " + unitText;
}

export default function parseAmount(amount: string) {
  const { quantity, unitText, quantityText } = parseFoodDescription(mockFoodDescription(amount));
  return {
    quantity: quantity || 0,
    unit: rawUnit(unitText).toUnit(),
    unitText,
    amountWithUnitText: _.partial(compose, quantityText),
  };
}

export type Amount = ReturnType<typeof parseAmount>;

export function unitOf(amount: string) {
  return parseAmount(amount).unit;
}
