import convert from "convert-units";
import { Mass, Volume } from "convert-units";
import _ from "lodash";
import parseFoodDescription from "./foodDescription";

function mockFoodDescription(amount: string) {
  // add food name to make a food description
  return "food " + amount;
}

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

function toUnit(s: string) {
  return UNIT_MAP.get(_.lowerCase(s));
}

function _parseRawUnit(unitText?: string) {
  const words = _.words(_.lowerCase(unitText));
  if (_.size(words) === 0) return "";
  const first = words[0];

  if ((["fluid", "fl"].includes(first)) && _.size(words) > 1) {
    return first + " " + words[1];
  }
  return first;
}

function rawUnit(unitText?: string) {
  return {
    toUnit: _.partial(toUnit, _parseRawUnit(unitText)),
  }
}

export function parseAmount(amount: string) {
  const { quantity, unitText } = parseFoodDescription(mockFoodDescription(amount));
  return {
    quantity: quantity || 0,
    unit: rawUnit(unitText).toUnit(),
    unitText,
  };
}

export type Amount = ReturnType<typeof parseAmount>;
export type Unit = Amount['unit']

export function unitOf(amount: string) {
  return parseAmount(amount).unit;
}

type Measure = "volume" | "mass" | undefined;

export function isMeasure(unit: Unit, measure?: Measure) {
  if (_.isUndefined(unit) || _.isUndefined(measure)) return false;
  return convert().possibilities(measure).includes(unit);
}

export function measureOf(unit: Unit): Measure | undefined {
  if (_.isUndefined(unit)) return undefined;
  if (isMeasure(unit, "volume")) return "volume";
  if (isMeasure(unit, "mass")) return "mass";
  return undefined;
}
