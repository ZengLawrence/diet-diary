import configureMeasurements, { mass, MassSystems, MassUnits, volume, VolumeSystems, VolumeUnits } from "convert-units";
import _ from "lodash";
import size, { SizeSystems, SizeUnits } from "./SizeUnit";
import unknown, { UnknownSystems, UnknownUnits } from "./UnknownUnit";

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

export function toUnit(unitName: string) {
  return _.defaultTo(UNIT_MAP.get(_.lowerCase(unitName)), "unknown");
}

export type Unit = Units;

function isConvertible(fromUnit: Unit, toUnit: Unit) {
  return _convert().from(fromUnit)
    .possibilities()
    .includes(toUnit);
}

/**
 * Indicate if a measurement can be converted from a given unit.  If a given unit is "unknown", the measurement is convertible.
 * 
 * @param fromUnit unit to convert from
 * @param measurement measurement to convert to
 * @returns true if measurement can be converted from a given unit or given unit is "unknown"
 */
export function isMeasurementConvertible(fromUnit: Unit, measurement: { unit: Unit; }) {
  const { unit: toUnit } = measurement;
  return isConvertible(fromUnit, toUnit);
}

export default function convert(quantity: number, unit: Unit, toUnit: Unit) {
  return _convert(quantity).from(unit).to(toUnit);
}