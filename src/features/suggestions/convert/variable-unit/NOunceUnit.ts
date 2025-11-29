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

function canParse(_unitText: string | undefined): boolean {
  if (_unitText) {
    return /^\d+-ounce(?:$|\s)/.test(_unitText);
  }
  return false;
}

const functions: ConvertFunctions<NOunceUnit> & ParserFunctions<NOunceUnit> = {
  isSupportedUnitType: isNOunceUnit,
  areUnitsConvertible,
  convert,
  canParse,
  parse: () => ({ ounce: 0 }),
}
export default functions;