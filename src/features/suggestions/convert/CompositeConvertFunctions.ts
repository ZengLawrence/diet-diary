import { ConvertFunctions } from "./ConvertFunctions";
import { ParserFunctions } from "./ParserFunctions";
import { isStandardUnit, StandardUnit, StandardUnitConvertFunctions, StandardUnitParserFunctions } from "./standard-unit";
import { isVariableUnit, VariableUnit, VariableUnitConvertFunctions, VariableUnitParseFunctions } from "./variable-unit";

export type Unit = StandardUnit | VariableUnit;

function isStandardUnitMeasurement(measurement: { unit: Unit; }): measurement is { unit: StandardUnit } {
  return isStandardUnit(measurement.unit);
}

function isVariableUnitMeasurement(measurement: { unit: Unit; }): measurement is { unit: VariableUnit } {
  return isVariableUnit(measurement.unit);
}

function isMeasurementConvertible(fromUnit: Unit, measurement: { unit: Unit; }) {
  if (isStandardUnit(fromUnit) && isStandardUnitMeasurement(measurement)) {
    return StandardUnitConvertFunctions.isMeasurementConvertible(fromUnit, measurement);
  } else if (isVariableUnit(fromUnit) && isVariableUnitMeasurement(measurement)) {
    return VariableUnitConvertFunctions.isMeasurementConvertible(fromUnit, measurement);
  }
  return false;
}

function convert(quantity: number, unit: Unit, toUnit: Unit) {
  if (isStandardUnit(unit) && isStandardUnit(toUnit)) {
    return StandardUnitConvertFunctions.convert(quantity, unit, toUnit);
  } else if (isVariableUnit(unit) && isVariableUnit(toUnit)) {
    return VariableUnitConvertFunctions.convert(quantity, unit, toUnit);
  }
  return NaN;
}

export const CompositeConvertFunctions: ConvertFunctions<Unit> = {
  isMeasurementConvertible,
  convert,
}

function canParse(unitText: string | undefined) {
  return VariableUnitParseFunctions.canParse(unitText)
    || StandardUnitParserFunctions.canParse(unitText);
}

function parse(unitText: string | undefined) {
  if (VariableUnitParseFunctions.canParse(unitText)) {
    return VariableUnitParseFunctions.parse(unitText);
  }
  return StandardUnitParserFunctions.parse(unitText);
}

export const CompositeParserFunctions: ParserFunctions<Unit> = {
  canParse,
  parse,
}