import { ConvertFunctions } from "./ConvertFunctions";
import { isStandardUnit, StandardUnit, StandardUnitConvertFunctions } from "./standard-unit";
import { isVariableUnit, VariableUnit, VariableUnitConvertFunctions } from "./variable-unit";

type Unit = StandardUnit | VariableUnit;

function isMeasurementConvertible(fromUnit: Unit, toUnit: Unit) {
  if (isStandardUnit(fromUnit) && isStandardUnit(toUnit)) {
    return StandardUnitConvertFunctions.isMeasurementConvertible(fromUnit, toUnit);
  } else if (isVariableUnit(fromUnit) && isVariableUnit(toUnit)) {
    return VariableUnitConvertFunctions.isMeasurementConvertible(fromUnit, toUnit);
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