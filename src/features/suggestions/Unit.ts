import convert, { Mass, Volume } from "convert-units";
import _ from "lodash";

const UNIT_MAP = new Map<string, (Mass | Volume)>([
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
])

export function toUnit(unitName: string) {
  return UNIT_MAP.get(_.lowerCase(unitName));
}

export type Unit = ReturnType<typeof toUnit>;

export function isConvertible(fromUnit: Unit, toUnit: Unit) {
  if (_.isUndefined(fromUnit))
    return true;

  return isMeasure(toUnit, measureOf(fromUnit));
}

type Measure = "volume" | "mass" | undefined;

function isMeasure(unit: Unit, measure?: Measure) {
  if (_.isUndefined(unit) || _.isUndefined(measure))
    return false;
  return convert().possibilities(measure).includes(unit);
}

function measureOf(unit: Unit): Measure | undefined {
  if (_.isUndefined(unit))
    return undefined;
  if (isMeasure(unit, "volume"))
    return "volume";
  if (isMeasure(unit, "mass"))
    return "mass";
  return undefined;
}
