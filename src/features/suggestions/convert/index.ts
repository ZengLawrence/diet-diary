import _ from "lodash";
import { CompositeConvertFunctions } from "./CompositeConvertFunctions";

export type { Unit } from "./CompositeConvertFunctions";

export const isMeasurementConvertible = CompositeConvertFunctions.isMeasurementConvertible;

const convert = CompositeConvertFunctions.convert;
export default convert;

function parseUnitName(unitText?: string) {
  const words = _.words(_.lowerCase(unitText));
  if (_.size(words) === 0) return "";
  const first = words[0];

  //TODO fix this
  if ((["fluid", "fl"].includes(first)) && _.size(words) > 1) {
    return first + " " + words[1];
  }
  if (first === "of" && _.size(words) > 2) {
    return (words[1] + "-" + words[2]);
  }
  return first;
}

export function parseUnit(unitText?: string) {
  const { toUnit } = CompositeConvertFunctions;
  return toUnit(parseUnitName(unitText));
}
