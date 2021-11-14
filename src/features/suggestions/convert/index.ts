import composeConverter from "./CompositeConvertFunctions";
import composeParser from "./CompositeParserFunctions";
import { StandardUnit, StandardUnitConvertFunctions, StandardUnitParserFunctions } from "./standard-unit";
import { VariableUnit, VariableUnitConvertFunctions, VariableUnitParseFunctions } from "./variable-unit";

export type Unit = StandardUnit | VariableUnit;

const converter = composeConverter<any>(VariableUnitConvertFunctions, StandardUnitConvertFunctions);
export function isMeasurementConvertible(fromUnit: Unit, measurement: { unit: Unit; }) {
  const toUnit = measurement.unit;
  return converter.areUnitsConvertible(fromUnit, toUnit);
}

function convert(quantity: number, unit: Unit, toUnit: Unit){
  return converter.convert(quantity, unit, toUnit);
}

export const parseUnit = composeParser<Unit>(VariableUnitParseFunctions, StandardUnitParserFunctions).parse;

export default convert;