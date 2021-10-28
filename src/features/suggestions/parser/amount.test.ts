import { parseAmount } from "./amount";

test("unit pound -> lb", () => {
  expect(parseAmount("1 pound")).toMatchObject(
    {
      quantity: 1,
      unit: "lb"
    }
  );
})

test("unit ounce -> oz", () => {
  expect(parseAmount("1 ounce")).toMatchObject(
    {
      quantity: 1,
      unit: "oz"
    }
  );
})

test("plural unit ounces -> oz", () => {
  expect(parseAmount("2 ounces")).toMatchObject(
    {
      quantity: 2,
      unit: "oz"
    }
  );
})

test("unit fluid ounce -> fl-oz", () => {
  expect(parseAmount("1 fluid ounce")).toMatchObject(
    {
      quantity: 1,
      unit: "fl-oz"
    }
  );
})

test("plural unit fluid ounces -> fl-oz", () => {
  expect(parseAmount("2 fluid ounces")).toMatchObject(
    {
      quantity: 2,
      unit: "fl-oz"
    }
  );
})
