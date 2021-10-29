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

test("unit cup -> cup", () => {
  expect(parseAmount("1 cup")).toMatchObject(
    {
      quantity: 1,
      unit: "cup"
    }
  );
})

test("plural unit cups -> cup", () => {
  expect(parseAmount("2 cups")).toMatchObject(
    {
      quantity: 2,
      unit: "cup"
    }
  );
})

test("unit teaspoon -> tsp", () => {
  expect(parseAmount("1 teaspoon")).toMatchObject(
    {
      quantity: 1,
      unit: "tsp"
    }
  );
})

test("plural unit teaspoons -> tsp", () => {
  expect(parseAmount("2 teaspoons")).toMatchObject(
    {
      quantity: 2,
      unit: "tsp"
    }
  );
})

test("unit tablespoon -> Tbs", () => {
  expect(parseAmount("1 tablespoon")).toMatchObject(
    {
      quantity: 1,
      unit: "Tbs"
    }
  );
})

test("plural unit tablespoons -> Tbs", () => {
  expect(parseAmount("2 tablespoons")).toMatchObject(
    {
      quantity: 2,
      unit: "Tbs"
    }
  );
})
