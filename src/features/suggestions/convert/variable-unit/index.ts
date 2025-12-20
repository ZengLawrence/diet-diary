import composeConverter from "../ConvertFunctions";
import composeParser from "../ParserFunctions";
import type { DiameterUnit } from "./DiameterUnit";
import diameterUnitFunctions from "./DiameterUnit";
import type { NOunceUnit } from "./NOunceUnit";
import nOunceUnitFunctions from "./NOunceUnit";

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