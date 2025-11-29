import _ from "lodash";
import { ConvertFunctions } from "../ConvertFunctions";
import { ParserFunctions } from "../ParserFunctions";

interface NOunceUnit {
  ounce: number;
}

function isNOunceUnit(unit: unknown): unit is NOunceUnit {
  return unit instanceof Object && "ounce" in unit;
}

function areUnitsConvertible(fromUnit: unknown, toUnit: unknown): boolean {
  return isNOunceUnit(fromUnit) && isNOunceUnit(toUnit);
}

function convert(quantity: number, fromUnit: NOunceUnit, toUnit: NOunceUnit): number {
  return quantity * (fromUnit.ounce / toUnit.ounce);
}

const PATTERN_N_OUNCE = /^(\d+)-ounce(?:$|\s)/;
function canParse(_unitText: string | undefined): boolean {
  if (_unitText) {
    return PATTERN_N_OUNCE.test(_unitText);
  }
  return false;
}

function parse(unitText: string | undefined): NOunceUnit {
  const match = unitText?.match(PATTERN_N_OUNCE);
  if (match) {
    const ounce = _.toNumber(match[1]);
    return { ounce };
  }
  return { ounce: NaN };
}

const functions: ConvertFunctions<NOunceUnit> & ParserFunctions<NOunceUnit> = {
  isSupportedUnitType: isNOunceUnit,
  areUnitsConvertible,
  convert,
  canParse,
  parse,
}
export default functions;