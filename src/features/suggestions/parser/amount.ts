import _ from "lodash";
import parseFoodDescription from "./foodDescription";
import { toUnit } from "../Unit";

function mockFoodDescription(amount: string) {
  // add food name to make a food description
  return "food " + amount;
}

function parseUnitText(unitText?: string) {
  const words = _.words(_.lowerCase(unitText));
  if (_.size(words) === 0) return "";
  const first = words[0];

  if ((["fluid", "fl"].includes(first)) && _.size(words) > 1) {
    return first + " " + words[1];
  }
  return first;
}

function from(unitText?: string) {
  return {
    toUnit: _.partial(toUnit, parseUnitText(unitText)),
  }
}

function compose(quantityText: string | undefined, unitText: string) {
  return quantityText + " " + unitText;
}

export default function parseAmount(amount: string) {
  const { measurement, alternateMeasurement } = parseFoodDescription(mockFoodDescription(amount));
  if (_.isUndefined(alternateMeasurement)) {
    return {
      measurement: {
        quantity: measurement?.quantity || 0,
        unit: from(measurement?.unitText).toUnit(),
        unitText: measurement?.unitText,
        amountWithUnitText: _.partial(compose, measurement?.quantityText),
      },
    };  
  } else {
    return {
      measurement: {
        quantity: measurement?.quantity || 0,
        unit: from(measurement?.unitText).toUnit(),
        unitText: measurement?.unitText,
        amountWithUnitText: _.partial(compose, measurement?.quantityText),
      },
      alternateMeasurement: {
        quantity: alternateMeasurement?.quantity,
        unit: from(alternateMeasurement?.unitText).toUnit(),
      }
    };  
  }
}

export type Amount = ReturnType<typeof parseAmount>;

export function unitOf(amount?: string) {
  return parseAmount(amount || "").measurement.unit;
}
