import { CompositeConvertFunctions } from "./CompositeConvertFunctions";
import composeParser from "./CompositeParserFunctions";
import { StandardUnit, StandardUnitParserFunctions } from "./standard-unit";
import { VariableUnit, VariableUnitParseFunctions } from "./variable-unit";

export type Unit = StandardUnit | VariableUnit;
export function isMeasurementConvertible(fromUnit: Unit, measurement: { unit: Unit; }) {
  const toUnit = measurement.unit;
  return CompositeConvertFunctions.isMeasurementConvertible(fromUnit, toUnit);
}

export const parseUnit = composeParser<Unit>(VariableUnitParseFunctions, StandardUnitParserFunctions).parse;

const convert = CompositeConvertFunctions.convert;
export default convert;
