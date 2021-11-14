import { parseUnit } from ".";

test("convert standard unit", () => {
  const result = parseUnit("cup");
  expect(result).toBe("cup");
})

test("convert variable unit", () => {
  const result = parseUnit("of 12-inch");
  expect(result).toMatchObject({ diameter: 12 });
})
