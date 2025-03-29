import _ from "lodash";
import { parseUnit } from "../convert";
import parse, { Measurement } from "./amount";

function compose(quantityText: string | undefined, unitText: string) {
  return quantityText + " " + unitText;
}

function createMeasurement(measurement?: Measurement) {
  return {
    quantity: measurement?.quantity || 1,
    unit: parseUnit(measurement?.unitText),
    unitText: measurement?.unitText,
    amountWithUnitText: _.partial(compose, measurement?.quantityText),
  }
}

export default function decompose(amount: string) {
  const { measurement, alternateMeasurement } = parse(amount);
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

export type DecomposedAmount = ReturnType<typeof decompose>;

