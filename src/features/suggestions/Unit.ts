import configureMeasurements, { mass, MassSystems, MassUnits, volume, VolumeSystems, VolumeUnits } from "convert-units";
import _ from "lodash";
import size, { SizeSystems, SizeUnits } from "./SizeUnit";

type Measure = "volume" | "mass" | "size";
type Systems = VolumeSystems | MassSystems | SizeSystems;
type Units = VolumeUnits | MassUnits | SizeUnits;
export const convert = configureMeasurements<Measure, Systems, Units>({
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

export type Unit = ReturnType<typeof toUnit>;

export function isConvertible(fromUnit: Units, toUnit: Units) {
  return convert().from(fromUnit)
    .possibilities()
    .includes(toUnit);
}
