import { ParserFunctions } from "./ParserFunctions";
import { StandardUnitParserFunctions } from "./standard-unit";
import { VariableUnitParseFunctions } from "./variable-unit";
import { Unit } from "./CompositeConvertFunctions";

function canParse(unitText: string | undefined) {
  return VariableUnitParseFunctions.canParse(unitText)
    || StandardUnitParserFunctions.canParse(unitText);
}

function parse(unitText: string | undefined) {
  if (VariableUnitParseFunctions.canParse(unitText)) {
    return VariableUnitParseFunctions.parse(unitText);
  }
  return StandardUnitParserFunctions.parse(unitText);
}

export const CompositeParserFunctions: ParserFunctions<Unit> = {
  canParse,
  parse,
};