import configureMeasurements, { mass, MassSystems, MassUnits, volume, VolumeSystems, VolumeUnits } from "convert-units";
import _ from "lodash";
import size, { SizeSystems, SizeUnits } from "./SizeUnit";
import unknown, { UnknownSystems, UnknownUnits } from "./UnknownUnit";
import { ConvertFunctions } from "../ConvertFunctions";
import { ParserFunctions } from "../ParserFunctions";

type Measures = "volume" | "mass" | "size" | "unknown";
type Systems = VolumeSystems | MassSystems | SizeSystems | UnknownSystems;
type Units = VolumeUnits | MassUnits | SizeUnits | UnknownUnits;
const _convert = configureMeasurements<Measures, Systems, Units>({
  volume,
  mass,
  size,
  unknown,
});

const UNIT_MAP = new Map<string, Units>([
  // volume
  ["teaspoon", "tsp"],
  ["teaspoons", "tsp"],
  ["tsp", "tsp"],
  ["tablespoon", "Tbs"],
  ["tablespoons", "Tbs"],
  ["tbsp", "Tbs"],
  ["cup", "cup"],
  ["cups", "cup"],
  ["pint", "pnt"],
  ["pints", "pnt"],
  ["pt", "pnt"],
  ["quart", "qt"],
  ["quarts", "qt"],
  ["qt", "qt"],
  ["gallon", "gal"],
  ["gallons", "gal"],
  ["gal", "gal"],
  ["fluid ounce", "fl-oz"],
  ["fluid ounces", "fl-oz"],
  ["fl oz", "fl-oz"],
  ["milliliter", "ml"],
  ["milliliters", "ml"],
  ["ml", "ml"],
  ["liter", "l"],
  ["liters", "l"],
  ["l", "l"],

  // mass
  ["ounce", "oz"],
  ["ounces", "oz"],
  ["oz", "oz"],
  ["pound", "lb"],
  ["pounds", "lb"],
  ["lb", "lb"],
  ["gram", "g"],
  ["grams", "g"],
  ["g", "g"],
  ["kilogram", "kg"],
  ["kilograms", "kg"],
  ["kg", "kg"],

  // size
  ["small", "small"],
  ["medium", "medium"],
  ["large", "large"],
])

function toUnit(unitName: string) {
  return _.defaultTo(UNIT_MAP.get(_.lowerCase(unitName)), "unknown");
}

export type StandardUnit = Units;

function isStandardUnit(unit: any): unit is StandardUnit {
  return typeof unit === "string";
}

function areUnitsConvertible(fromUnit: StandardUnit, toUnit: StandardUnit) {
  return _convert().from(fromUnit)
    .possibilities()
    .includes(toUnit);
}

function convert(quantity: number, unit: StandardUnit, toUnit: StandardUnit) {
  if (areUnitsConvertible(unit, toUnit)) {
    return _convert(quantity).from(unit).to(toUnit);
  } else {
    return NaN;
  }
}

export const StandardUnitConvertFunctions: ConvertFunctions<StandardUnit> = {
  isSupportedUnitType: isStandardUnit,
  areUnitsConvertible,
  convert,
};

function canParse() {
  return true;
}

function getUnitName(unitText: string | undefined) {
  const words = _.words(_.lowerCase(unitText));
  if (_.size(words) === 0) return "";
  const first = words[0];

  if ((["fluid", "fl"].includes(first)) && _.size(words) > 1) {
    return first + " " + words[1];
  }
  return first;
}

function parse(unitText: string | undefined) {
  return toUnit(getUnitName(unitText));
}

export const StandardUnitParserFunctions: ParserFunctions<StandardUnit> = {
  canParse,
  parse,
}