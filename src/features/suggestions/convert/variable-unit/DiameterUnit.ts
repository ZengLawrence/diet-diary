import _ from "lodash";
import { ConvertFunctions } from "../ConvertFunctions";
import { ParserFunctions } from "../ParserFunctions";

export interface DiameterUnit {
  diameter: number;
}

function isDiameterUnit(unit: any): unit is DiameterUnit {
  return unit instanceof Object && "diameter" in unit;
}

export function isDiameterUnitName(unitName: string) {
  return /^[1-9][0-9]*-inch$/.test(unitName);
}

function toUnit(unitName: string): DiameterUnit {
  const diameter = _.toNumber(_.head(_.split(unitName, "-")));
  return { diameter };
}

function areUnitsConvertible(fromUnit: DiameterUnit, toUnit: DiameterUnit) {
  return true;
}

function convert(quantity: number, unit: DiameterUnit, toUnit: DiameterUnit) {
  const squared = (val: number) => _.multiply(val, val);
  return quantity * squared(unit.diameter) / squared(toUnit.diameter);
}

function canParse(unitText: string | undefined) {
  const words = _.split(unitText, " ");
  if (_.size(words) === 0) return false;

  const first = words[0];
  if (isDiameterUnitName(first)) return true;
  if (first === "of" && _.size(words) > 1) {
    const second = words[1];
    return isDiameterUnitName(second);
  }

  return false;
}

function parse(unitText: string | undefined) {
  if (canParse(unitText)) {
    const words = _.split(unitText, " ");
    const first = words[0];
    if (isDiameterUnitName(first)) {
      return toUnit(first);
    }
    return toUnit(words[1]);
  }
  return { diameter: NaN };
}

const functions: ConvertFunctions<DiameterUnit> & ParserFunctions<DiameterUnit> = {
  isSupportedUnitType: isDiameterUnit,
  areUnitsConvertible,
  convert,
  canParse,
  parse,
}
export default functions;