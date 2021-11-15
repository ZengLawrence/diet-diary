import composeConverter from "./CompositeConvertFunctions";
import composeParser from "./CompositeParserFunctions";
import standardUnitFunctions, { StandardUnit } from "./standard-unit";
import variableUnitFunctions, { VariableUnit } from "./variable-unit";

export type Unit = StandardUnit | VariableUnit;

const converter = composeConverter<Unit>(variableUnitFunctions, standardUnitFunctions);
export function isMeasurementConvertible(fromUnit: Unit, measurement: { unit: Unit; }) {
  const toUnit = measurement.unit;
  return converter.areUnitsConvertible(fromUnit, toUnit);
}

const convert = converter.convert;

export const parseUnit = composeParser<Unit>(variableUnitFunctions, standardUnitFunctions).parse;

export default convert;