import _ from "lodash";
import { ConvertFunctions } from "../ConvertFunctions";

export interface DiameterUnit {
  diameter: number;
}

export function isDiameterUnit(unit: object): unit is DiameterUnit {
  return ("diameter" in unit);
}

export function isDiameterUnitName(unitName: string) {
  return /^of [1-9][0-9]*-inch$/.test(unitName);
}

function toUnit(unitName: string): DiameterUnit {
  if (isDiameterUnitName(unitName)) {
    const words = _.words(unitName);
    if (_.size(words) > 1) {
      const diameter = _.toNumber(_.head(_.split(words[1], "-")));
      return { diameter };
    }
  }
  return {
    diameter: NaN,
  }
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