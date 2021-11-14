import { isDiameterUnit, isDiameterUnitName, DiameterUnit, DiameterUnitConvertFunctions, DiameterUnitParserFunctions } from "./DiameterUnit";

export type VariableUnit = DiameterUnit;
export const VariableUnitConvertFunctions = DiameterUnitConvertFunctions;
export const VariableUnitParseFunctions = DiameterUnitParserFunctions;
export const isVariableUnitName = isDiameterUnitName;

export function isVariableUnit(unit: any): unit is VariableUnit {
  return (unit instanceof Object && isDiameterUnit(unit));
}