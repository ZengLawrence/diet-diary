import { ConvertFunctions } from "../ConvertFunctions";
import { ParserFunctions } from "../ParserFunctions";

interface NOunceUnit {
  ounce: number;
}

function isNOunceUnit(unit: unknown): unit is NOunceUnit {
  return unit instanceof Object && "ounce" in unit;
}

const functions: ConvertFunctions<NOunceUnit> & ParserFunctions<NOunceUnit> = {
  isSupportedUnitType: isNOunceUnit,
  areUnitsConvertible: () => true,
  convert: () => 0,
  canParse: () => false,
  parse: () => ({ ounce: 0 }),
}
export default functions;