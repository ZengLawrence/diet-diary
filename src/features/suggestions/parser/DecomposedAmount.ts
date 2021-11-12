import _ from "lodash";
import { toUnit } from "../convert";
import parseFoodDescription, { Measurement } from "./foodDescription";

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

function createMeasurement(measurement?: Measurement) {
  return {
    quantity: measurement?.quantity || 0,
    unit: from(measurement?.unitText).toUnit(),
    unitText: measurement?.unitText,
    amountWithUnitText: _.partial(compose, measurement?.quantityText),
  }
}

export default function parseAmount(amount: string) {
  const { measurement, alternateMeasurement } = parseFoodDescription(mockFoodDescription(amount));
  if (_.isUndefined(alternateMeasurement)) {
    return {
      measurement: createMeasurement(measurement),
    };  
  } else {
    return {
      measurement: createMeasurement(measurement),
      alternateMeasurement: createMeasurement(alternateMeasurement),
    };  
  }
}

export type DecomposedAmount = ReturnType<typeof parseAmount>;

