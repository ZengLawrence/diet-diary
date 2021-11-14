import { CompositeConvertFunctions } from "./CompositeConvertFunctions";
import { CompositeParserFunctions } from "./CompositeParserFunctions";

export const isMeasurementConvertible = CompositeConvertFunctions.isMeasurementConvertible;
export const parseUnit = CompositeParserFunctions.parse;
export type Unit = ReturnType<typeof parseUnit>;

const convert = CompositeConvertFunctions.convert;
export default convert;
