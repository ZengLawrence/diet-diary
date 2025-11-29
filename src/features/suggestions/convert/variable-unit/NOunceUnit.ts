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

const functions: ConvertFunctions<NOunceUnit> & ParserFunctions<NOunceUnit> = {
  isSupportedUnitType: isNOunceUnit,
  areUnitsConvertible,
  convert,
  canParse: () => false,
  parse: () => ({ ounce: 0 }),
}
export default functions;