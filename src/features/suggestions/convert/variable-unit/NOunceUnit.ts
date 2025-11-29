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

const functions: ConvertFunctions<NOunceUnit> & ParserFunctions<NOunceUnit> = {
  isSupportedUnitType: isNOunceUnit,
  areUnitsConvertible,
  convert: () => 0,
  canParse: () => false,
  parse: () => ({ ounce: 0 }),
}
export default functions;