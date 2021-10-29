import { parseAmount } from "./amount";

test("unit pound(s) -> lb", () => {
  testCases("pound", "lb").run();
})

test("unit ounce(s) -> oz", () => {
  testCases("ounce", "oz").run();
})

test("unit fluid ounce(s) -> fl-oz", () => {
  testCases("fluid ounce", "fl-oz").run();
})

test("unit cup(s) -> cup", () => {
  testCases("cup", "cup").run();
})

test("unit teaspoon(s) -> tsp", () => {
  testCases("teaspoon", "tsp").run();
})

test("unit tablespoon(s) -> Tbs", () => {
  testCases("tablespoon", "Tbs").run();
})

function testCases(unit: string, abbr: string) {
  const singular = {
    input: "1 " + unit,
    output: {
      unit: abbr
    }
  };
  const plural = {
    input: "2 " + unit + "s",
    output: {
      unit: abbr
    }
  }
  return {
    run: () => {
      expect(parseAmount(singular.input)).toMatchObject(singular.output);
      expect(parseAmount(plural.input)).toMatchObject(plural.output);
    }
  }
}