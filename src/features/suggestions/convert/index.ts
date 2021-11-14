import _ from "lodash";
import { CompositeConvertFunctions, CompositeParserFunctions } from "./CompositeConvertFunctions";

export type { Unit } from "./CompositeConvertFunctions";

export const isMeasurementConvertible = CompositeConvertFunctions.isMeasurementConvertible;
export const parseUnit = CompositeParserFunctions.parse;

const convert = CompositeConvertFunctions.convert;
export default convert;
