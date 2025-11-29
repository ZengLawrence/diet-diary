import composeConverter from "../ConvertFunctions";
import composeParser from "../ParserFunctions";
import diameterUnitFunctions, { DiameterUnit } from "./DiameterUnit";
import nOunceUnitFunctions, { NOunceUnit } from "./NOunceUnit";

export type VariableUnit = DiameterUnit | NOunceUnit;

const converters = composeConverter<VariableUnit>(
  diameterUnitFunctions,
  nOunceUnitFunctions,
);
const parsers = composeParser<VariableUnit>(
  diameterUnitFunctions,
  nOunceUnitFunctions,
);
const functions = { ...converters, ...parsers };
export default functions;