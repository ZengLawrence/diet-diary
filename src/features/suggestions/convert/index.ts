import { CompositeConvertFunctions } from "./CompositeConvertFunctions";

export type { Unit } from "./CompositeConvertFunctions";

export const toUnit = CompositeConvertFunctions.toUnit;
export const isMeasurementConvertible = CompositeConvertFunctions.isMeasurementConvertible;

const convert = CompositeConvertFunctions.convert;
export default convert;