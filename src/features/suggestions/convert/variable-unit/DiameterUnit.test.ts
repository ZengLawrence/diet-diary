import { expect, test } from "@jest/globals";
import functions from "./DiameterUnit"

const { areUnitsConvertible } = functions;

test("diameter units are always convertible", () => {
  const result = areUnitsConvertible({ diameter: 12 }, { diameter: 14 });
  expect(result).toBeTruthy();
})

const { convert } = functions;

test("convert 1 2-inch diameter to 1-inch diameter should return 4", () => {
  const result = convert(1, { diameter: 2 }, { diameter: 1 });
  expect(result).toBe(4);
})

test("convert 2 2-inch diameter to 4-inch diameter should return 0.5", () => {
  const result = convert(2, { diameter: 2 }, { diameter: 4 });
  expect(result).toBe(0.5);
})

const { canParse, parse } = functions;

test("parse text to diameter", () => {
  const unitText = "6-inch";
  expect(canParse(unitText)).toBeTruthy();
  expect(parse(unitText)).toMatchObject({ diameter: 6 });
})

test("parse text starts with 'of' to diameter", () => {
  const unitText = "of 12-inch";
  expect(canParse(unitText)).toBeTruthy();
  expect(parse(unitText)).toMatchObject({ diameter: 12 });
})

test("parse invalid text should return diameter of NaN", () => {
  const unitText = "invalid";
  expect(canParse(unitText)).toBeFalsy();
  expect(parse(unitText)).toMatchObject({ diameter: NaN });
})