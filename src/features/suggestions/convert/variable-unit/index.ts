import { isDiameterUnit, isDiameterUnitName, DiameterUnit, DiameterUnitConvertFunctions } from "./DiameterUnit";

export type VariableUnit = DiameterUnit;
export const VariableUnitConvertFunctions = DiameterUnitConvertFunctions;
export const isVariableUnitName = isDiameterUnitName;

export function isVariableUnit(unit: any): unit is VariableUnit {
  return (unit instanceof Object && isDiameterUnit(unit));
}