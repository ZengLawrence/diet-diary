import Fraction from "fraction.js";
import type { Unit } from "../convert";
import { parseUnit } from "../convert";
import _ from "lodash";

interface Measurement {
  quantity?: number,
  quantityText?: string,
  unitText?: string,
}

export type DecomposedAmount = {
  measurement: {
    quantity: number;
    unit: Unit;
    unitText: string | undefined;
    amountWithUnitText: (unitText: string) => string;
  };
  alternateMeasurement?: undefined;
} | {
  measurement: {
    quantity: number;
    unit: Unit;
    unitText: string | undefined;
    amountWithUnitText: (unitText: string) => string;
  };
  alternateMeasurement: {
    quantity: number;
    unit: Unit;
    unitText: string | undefined;
    amountWithUnitText: (unitText: string) => string;
  };
}

function toNumber(str: string): number {
  return str.includes('/') ? new Fraction(str).valueOf() : _.toNumber(str);
}

function parseMeasurement(measurementText: string) {
  const amountRegex = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+|\d*\.)((?=\s)[^\d].+|)$/;
  const match = measurementText.match(amountRegex);
  if (match) {
    const quantityText = match[1];
    const quantity = toNumber(quantityText);
    const unitText = match[2].trim() || undefined;
    return { quantity, quantityText, unitText };
  } else {
    return { quantity: 1, unitText: measurementText };
  }
}

function compose(quantityText: string | undefined, unitText: string) {
  return quantityText ? quantityText + " " + unitText : unitText;
}

function createMeasurement(measurement?: Measurement) {
  return {
    quantity: measurement?.quantity || 1,
    unit: parseUnit(measurement?.unitText),
    unitText: measurement?.unitText,
    amountWithUnitText: _.partial(compose, measurement?.quantityText),
  }
}

// parse amount string into two measurements when joined by "or"
function parseAmount(input: string) : {
  measurement? : Measurement,
  alternateMeasurement?: Measurement,
} {
  const orSeparatorRegex = /\s+or\s+/i;
  const parts = input.split(orSeparatorRegex).map(part => part.trim());
  if (parts.length === 2) {
    return {
      measurement: parseMeasurement(parts[0]),
      alternateMeasurement: parseMeasurement(parts[1]),
    };
  } else {
    return {
      measurement: parseMeasurement(input),
    };
  }
}

export default function decompose(amount: string): DecomposedAmount {
  const { measurement, alternateMeasurement } = parseAmount(amount);
  return {
    measurement: createMeasurement(measurement),
    alternateMeasurement: alternateMeasurement ? createMeasurement(alternateMeasurement) : undefined, 
  }
}