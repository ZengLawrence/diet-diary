import functions from ".";
const { areUnitsConvertible } = functions;

test("units are convertible", () => {
  expect(areUnitsConvertible("fl-oz", "cup")).toBeTruthy();
})

test("units are not convertible", () => {
  expect(areUnitsConvertible("cup", "oz")).toBeFalsy();
})

const { isSupportedUnitType } = functions;

test("'fl-oz' is standard unit", () => {
  expect(isSupportedUnitType('fl-oz')).toBeTruthy();
})

test("An object is not standard unit", () => {
  expect(isSupportedUnitType({ diameter: 12 })).toBeFalsy;
})

const { canParse, parse } = functions;

test("a standard unit text, canParse(string) returns true and parse(string) returns the Standard Unit", () => {
  expect(canParse("cup")).toBeTruthy();
  expect(parse("cup")).toBe("cup");
})

test("standard parser is default, canParse(string) always returns true and parse(string) returns 'unknown' as default", () => {
  expect(canParse(undefined)).toBeTruthy();
  expect(parse(undefined)).toBe("unknown");
})