import _ from "lodash";
import { ConvertFunctions } from "../ConvertFunctions";

export interface DiameterUnit {
  diameter: number;
}

function toUnit(unitName: string) {
  const diameter = _.toNumber(_.head(_.split(unitName, "-")));
  return { diameter };
}

function isMeasurementConvertible(_fromUnit: DiameterUnit, _measurement: { unit: DiameterUnit; }) {
  return true;
}

function convert(quantity: number, unit: DiameterUnit, toUnit: DiameterUnit) {
  const squared = (val: number) => _.multiply(val, val);
  return quantity * squared(unit.diameter) / squared(toUnit.diameter);
}

export const DiameterUnitConvertFunctions: ConvertFunctions<DiameterUnit> = {
  toUnit,
  isMeasurementConvertible,
  convert,
};