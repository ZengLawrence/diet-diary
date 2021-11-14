import { isStandardUnit, StandardUnitConvertFunctions, StandardUnitParserFunctions } from ".";
const { isMeasurementConvertible } = StandardUnitConvertFunctions;

test("units are convertible", () => {
  expect(isMeasurementConvertible("fl-oz", "cup")).toBeTruthy();
})

test("units are not convertible", () => {
  expect(isMeasurementConvertible("cup", "oz")).toBeFalsy();
})

test("'fl-oz' is standard unit", () => {
  expect(isStandardUnit('fl-oz')).toBeTruthy();
})

test("An object is not standard unit", () => {
  expect(isStandardUnit({ diameter: 12 })).toBeFalsy;
})

const { canParse, parse } = StandardUnitParserFunctions;

test("a standard unit text, canParse(string) returns true and parse(string) returns the Standard Unit", () => {
  expect(canParse("cup")).toBeTruthy();
  expect(parse("cup")).toBe("cup");
})

test("standard parser is default, canParse(string) always returns true and parse(string) returns 'unknown' as default", () => {
  expect(canParse(undefined)).toBeTruthy();
  expect(parse(undefined)).toBe("unknown");
})