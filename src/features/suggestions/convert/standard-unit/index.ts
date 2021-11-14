import configureMeasurements, { mass, MassSystems, MassUnits, volume, VolumeSystems, VolumeUnits } from "convert-units";
import _ from "lodash";
import size, { SizeSystems, SizeUnits } from "./SizeUnit";
import unknown, { UnknownSystems, UnknownUnits } from "./UnknownUnit";
import { ConvertFunctions } from "../ConvertFunctions";

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
export function isStandardUnit(unit: any): unit is StandardUnit{
  return typeof unit === "string";
}

function isConvertible(fromUnit: StandardUnit, toUnit: StandardUnit) {
  return _convert().from(fromUnit)
    .possibilities()
    .includes(toUnit);
}

function isMeasurementConvertible(fromUnit: StandardUnit, measurement: { unit: StandardUnit; }) {
  const { unit: toUnit } = measurement;
  return isConvertible(fromUnit, toUnit);
}

function convert(quantity: number, unit: StandardUnit, toUnit: StandardUnit) {
  return _convert(quantity).from(unit).to(toUnit);
}

export const StandardUnitConvertFunctions: ConvertFunctions<StandardUnit> = {
  toUnit,
  isMeasurementConvertible,
  convert,
};