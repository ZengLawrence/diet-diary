import { CompositeConvertFunctions } from "./CompositeConvertFunctions";
import { CompositeParserFunctions } from "./CompositeParserFunctions";

export type { Unit } from "./CompositeConvertFunctions";

export const isMeasurementConvertible = CompositeConvertFunctions.isMeasurementConvertible;
export const parseUnit = CompositeParserFunctions.parse;

const convert = CompositeConvertFunctions.convert;
export default convert;
