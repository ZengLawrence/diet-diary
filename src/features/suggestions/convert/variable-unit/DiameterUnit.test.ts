import { DiameterUnitConvertFunctions, DiameterUnitParserFunctions } from "./DiameterUnit"

const { isMeasurementConvertible } = DiameterUnitConvertFunctions;

test("diameter units are always convertible", () => {
  const result = isMeasurementConvertible({ diameter: 12 }, { diameter: 14 });
  expect(result).toBeTruthy();
})

const { convert } = DiameterUnitConvertFunctions;

test("convert 1 2-inch diameter to 1-inch diameter should return 4", () => {
  const result = convert(1, { diameter: 2 }, { diameter: 1 });
  expect(result).toBe(4);
})

test("convert 2 2-inch diameter to 4-inch diameter should return 0.5", () => {
  const result = convert(2, { diameter: 2 }, { diameter: 4 });
  expect(result).toBe(0.5);
})

const { canParse, parse } = DiameterUnitParserFunctions;

test("parse text to diameter", () => {
  const unitText = "of 12-inch";
  expect(canParse(unitText)).toBeTruthy();
  expect(parse(unitText)).toMatchObject({ diameter: 12 });
})

test("parse invalid text should return diameter of NaN", () => {
  const unitText = "invalid";
  expect(canParse(unitText)).toBeFalsy();
  expect(parse(unitText)).toMatchObject({ diameter: NaN });
})