import { StandardUnitConvertFunctions } from "./standard-unit";

export type { Unit } from "./standard-unit";

export const toUnit = StandardUnitConvertFunctions.toUnit;
export const isMeasurementConvertible = StandardUnitConvertFunctions.isMeasurementConvertible;

const convert = StandardUnitConvertFunctions.convert;
export default convert;