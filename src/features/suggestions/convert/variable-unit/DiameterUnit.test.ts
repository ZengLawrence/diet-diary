import { DiameterUnitConvertFunctions } from "./DiameterUnit"

const { toUnit } = DiameterUnitConvertFunctions;

test("convert text to diameter", () => {
  const result = toUnit("12-inch");
  expect(result).toMatchObject({diameter: 12});
})

const { isMeasurementConvertible } = DiameterUnitConvertFunctions;

test("diameter units are always convertible", () => {
  const result = isMeasurementConvertible({diameter: 12}, {unit: {diameter: 14}});
  expect(result).toBeTruthy();
})

const { convert } = DiameterUnitConvertFunctions;

test("convert 1 2-inch diameter to 1-inch diameter should return 4", () => {
  const result = convert(1, {diameter: 2}, {diameter: 1});
  expect(result).toBe(4);
})

test("convert 2 2-inch diameter to 4-inch diameter should return 0.5", () => {
  const result = convert(2, {diameter: 2}, {diameter: 4});
  expect(result).toBe(0.5);
})
