import { ConvertFunctions } from "./ConvertFunctions";
import { isStandardUnit, StandardUnit, StandardUnitConvertFunctions } from "./standard-unit";
import { isVariableUnit, isVariableUnitName, VariableUnit, VariableUnitConvertFunctions } from "./variable-unit";

export type Unit = StandardUnit | VariableUnit;

function toUnit(unitName: string) {
  if (isVariableUnitName(unitName)) {
    return VariableUnitConvertFunctions.toUnit(unitName);
  }
  return StandardUnitConvertFunctions.toUnit(unitName);
}

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
  toUnit,
  isMeasurementConvertible,
  convert,
}
