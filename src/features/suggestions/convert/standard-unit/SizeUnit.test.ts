import configureMeasurements from "convert-units";
import size from "./SizeUnit";

const convert = configureMeasurements({size});

test("convert anchor 'medium' to 'medium' should return 1", () => {
  const result = convert(1).from("medium").to("medium");
  expect(result).toBe(1);
})

test("convert 'small' to 'medium' should return 0.75", () => {
  const result = convert(1).from("small").to("medium");
  expect(result).toBe(0.75);
})

test("convert 'medium' to 'small' should return 1.3(3)", () => {
  const result = convert(1).from("medium").to("small");
  expect(result).toBeCloseTo(1.333);
})

test("convert 'large' to 'medium' should return 1.25", () => {
  const result = convert(1).from("large").to("medium");
  expect(result).toBe(1.5);
})

test("convert 'medium' to 'large' should return 0.6(6)", () => {
  const result = convert(1).from("medium").to("large");
  expect(result).toBeCloseTo(0.666);
})

test("convert 'small' to 'large' should return 0.5", () => {
  const result = convert(1).from("small").to("large");
  expect(result).toBe(0.5);
})

test("convert 'large' to 'small' should return 2", () => {
  const result = convert(1).from("large").to("small");
  expect(result).toBe(2);
})
