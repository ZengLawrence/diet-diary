import Fraction from "fraction.js";
import { parseUnit, Unit } from "../convert";
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

function parse(amount: string) {
  const amountRegex = /^(\d*\.?\d+|\d+\s+\d+\/\d+|\d+\/\d+)((?=\s).+|)$/;
  const match = amount.match(amountRegex);
  if (match) {
    const quantityText = match[1];
    const quantity = toNumber(quantityText);
    const unitText = match[2].trim() || undefined;
    return { quantity, quantityText, unitText };
  } else {
    return { quantity: 1, unitText: amount };
  }
}

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

export default function decompose(amount: string): DecomposedAmount {
  const measurement = parse(amount);
  return {
    measurement: createMeasurement(measurement),
  }
}