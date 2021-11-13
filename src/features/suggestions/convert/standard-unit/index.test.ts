import { StandardUnitConvertFunctions } from ".";
const isMeasurementConvertible = StandardUnitConvertFunctions.isMeasurementConvertible;

test("units are convertible", () => {
  expect(isMeasurementConvertible("fl-oz", { unit: "cup" })).toBeTruthy();
})

test("units are not convertible", () => {
  expect(isMeasurementConvertible("cup", { unit: "oz" })).toBeFalsy();
})
