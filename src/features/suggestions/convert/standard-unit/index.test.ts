import { isStandardUnit, StandardUnitConvertFunctions } from ".";
const { isMeasurementConvertible } = StandardUnitConvertFunctions;

test("units are convertible", () => {
  expect(isMeasurementConvertible("fl-oz", { unit: "cup" })).toBeTruthy();
})

test("units are not convertible", () => {
  expect(isMeasurementConvertible("cup", { unit: "oz" })).toBeFalsy();
})

test("'fl-oz' is standard unit", () => {
  expect(isStandardUnit('fl-oz')).toBeTruthy();
})

test("An object is not standard unit", () => {
  expect(isStandardUnit({ diameter: 12 })).toBeFalsy;
})
