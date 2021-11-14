import { CompositeConvertFunctions } from "./CompositeConvertFunctions";

const { isMeasurementConvertible } = CompositeConvertFunctions;

test("similar variable units e.g. diameter units are convertible", () => {
  const result = isMeasurementConvertible({ diameter: 12 }, { unit: { diameter: 14 } });
  expect(result).toBeTruthy();
})

test("similar standard units e.g. volume units are convertible", () => {
  const result = isMeasurementConvertible("fl-oz", { unit: "cup" });
  expect(result).toBeTruthy();
})

test("standard unit and variable unit are not convertible, vice versa", () => {
  expect(isMeasurementConvertible("fl-oz", { unit: { diameter: 12 } })).toBeFalsy();
  expect(isMeasurementConvertible({ diameter: 12 }, { unit: "fl-oz" })).toBeFalsy();
})

const { convert } = CompositeConvertFunctions;

test("similar variable units e.g. diameter units should convert", () => {
  expect(convert(1, { diameter: 2 }, { diameter: 1 })).toBe(4)
})

test("similar standard units e.g. volume units should convert", () => {
  expect(convert(8, "fl-oz", "cup")).toBe(1)
})

test("standard unit and variable unit should return NaN, vice versa", () => {
  expect(convert(1, "fl-oz", { diameter: 12 })).toBe(NaN);
  expect(convert(1, { diameter: 12 }, "fl-oz")).toBe(NaN);
})