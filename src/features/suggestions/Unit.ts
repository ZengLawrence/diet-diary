import configureMeasurements, { mass, MassSystems, MassUnits, volume, VolumeSystems, VolumeUnits } from "convert-units";
import _ from "lodash";
import size, { SizeSystems, SizeUnits } from "./SizeUnit";

type Measures = "volume" | "mass" | "size";
type Systems = VolumeSystems | MassSystems | SizeSystems;
type Units = VolumeUnits | MassUnits | SizeUnits;
const _convert = configureMeasurements<Measures, Systems, Units>({
  volume,
  mass,
  size,
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
  return UNIT_MAP.get(_.lowerCase(unitName));
}

export type Unit = Units;

export function isConvertible(fromUnit: Unit, toUnit: Unit) {
  return _convert().from(fromUnit)
    .possibilities()
    .includes(toUnit);
}

export function isMeasurementConvertible(fromUnit: Unit, measurement: { unit?: Unit; }) {
  const { unit: toUnit } = measurement;
  if (_.isUndefined(toUnit))
    return false;

  return isConvertible(fromUnit, toUnit);
}

export default function convert(quantity: number, unit: Unit, toUnit: Unit) {
  return _convert(quantity).from(unit).to(toUnit);
}