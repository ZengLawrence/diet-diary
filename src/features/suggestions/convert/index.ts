import { CompositeConvertFunctions } from "./CompositeConvertFunctions";
import composeParser from "./CompositeParserFunctions";
import { StandardUnit, StandardUnitParserFunctions } from "./standard-unit";
import { VariableUnit, VariableUnitParseFunctions } from "./variable-unit";

export const isMeasurementConvertible = CompositeConvertFunctions.isMeasurementConvertible;
export type Unit = StandardUnit | VariableUnit;
export const parseUnit = composeParser<Unit>(VariableUnitParseFunctions, StandardUnitParserFunctions).parse;

const convert = CompositeConvertFunctions.convert;
export default convert;
