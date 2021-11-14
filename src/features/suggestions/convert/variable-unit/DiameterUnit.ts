import _ from "lodash";
import { ConvertFunctions } from "../ConvertFunctions";
import { ParserFunctions } from "../ParserFunctions";

export interface DiameterUnit {
  diameter: number;
}

export function isDiameterUnit(unit: object): unit is DiameterUnit {
  return ("diameter" in unit);
}

export function isDiameterUnitName(unitName: string) {
  return /^[1-9][0-9]*-inch$/.test(unitName);
}

function toUnit(unitName: string): DiameterUnit {
  if (isDiameterUnitName(unitName)) {
    const diameter = _.toNumber(_.head(_.split(unitName, "-")));
    return { diameter };
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

function canParse(unitText: string | undefined) {
  const words = _.split(unitText, " ");
  if (_.size(words) === 0) return false;

  const first = words[0];
  if (first === "of" && _.size(words) > 1) {
    const second = words[1];
    return isDiameterUnitName(second);
  }

  return false;
}

function parse(unitText: string | undefined) {
  if (canParse(unitText)) {
    const words = _.split(unitText, " ");
    return toUnit(words[1]);
  }
  return { diameter: NaN };
}

export const DiameterUnitParserFunctions: ParserFunctions<DiameterUnit> = {
  canParse,
  parse,
}