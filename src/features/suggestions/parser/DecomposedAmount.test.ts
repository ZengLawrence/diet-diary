import _ from "lodash";
import { StandardUnit } from "../convert/standard-unit";
import parseAmount from "./DecomposedAmount";

test("unit pound(s) -> lb", () => {
  testCases("pound", "lb").run();
})

test("unit ounce(s) -> oz", () => {
  testCases("ounce", "oz").run();
})

test("unit fluid ounce(s) -> fl-oz", () => {
  testCases("fluid ounce", "fl-oz", ["fl oz"]).run();
})

test("unit cup(s) -> cup", () => {
  testCases("cup", "cup").run();
})

test("unit pint(s) -> pnt", () => {
  testCases("pint", "pnt", ["pt"]).run();
})

test("unit quart(s) -> qt", () => {
  testCases("quart", "qt").run();
})

test("unit gallon(s) -> gal", () => {
  testCases("gallon", "gal").run();
})

test("unit teaspoon(s) -> tsp", () => {
  testCases("teaspoon", "tsp").run();
})

test("unit tablespoon(s) -> Tbs", () => {
  testCases("tablespoon", "Tbs", ["tbsp"]).run();
})

test("unit gram(s) -> g", () => {
  testCases("gram", "g").run();
})

test("unit kilogram(s) -> g", () => {
  testCases("kilogram", "kg").run();
})

test("unit milliliter(s) -> ml", () => {
  testCases("milliliter", "ml").run();
})

test("unit liter(s) -> l", () => {
  testCases("liter", "l").run();
})

test("unit small -> small", () => {
  givenPluralHasSameSpelling().testCases("small", "small").run();
})

test("unit medium -> medium", () => {
  givenPluralHasSameSpelling().testCases("medium", "medium").run();
})

test("unit large -> large", () => {
  givenPluralHasSameSpelling().testCases("large", "large").run();
})

test("alternate measurement in amount", () => {
  expect(parseAmount("3/4 cup or 1 medium")).toMatchObject({
    measurement: {
      quantity: 0.75,
      unit: "cup",
      unitText: "cup",
    },
    alternateMeasurement: {
      quantity: 1,
      unit: "medium",
      unitText: "medium",
    }
  });
})

test("variable unit e.g. diameter unit '12-inch'", () => {
  expect(parseAmount("1/8 of 14-inch")).toMatchObject({
    measurement: {
      quantity: 0.125,
      unit: {
        diameter: 14,
      },
      unitText: "of 14-inch",
    }
  });
})

test("parenthesis in unit e.g. 1/2 large (4 ounces)", () => {
  expect(parseAmount("1/2 large (4 ounces)")).toMatchObject({
    measurement: {
      quantity: 0.5,
      unit: "large",
      unitText: "large (4 ounces)",
    }
  });
})

test("parenthesis in unit includes /", () => {
  expect(parseAmount("1 pack (3/4 ounce)")).toMatchObject({
    measurement: {
      quantity: 1,
      unit: "unknown",
      unitText: "pack (3/4 ounce)",
    }
  });
})

test("ounce unit with no quantity, default quantity to 1", () => {
  expect(parseAmount("2-ounce roll")).toMatchObject({
    measurement: {
      quantity: 1,
      unit: "unknown",
      unitText: "2-ounce roll",
    }
  });
})

function givenPluralHasSameSpelling() {
  return {
    testCases: _.partialRight(testCases, [], { pluralSameSpelling: true })
  }
}

function testCases(unit: string, abbr: StandardUnit, commonAbbreviations: string[] = [], options: { pluralSameSpelling: boolean } = { pluralSameSpelling: false }) {
  const singular = {
    input: "1 " + unit,
    output: {
      measurement: {
        unit: abbr
      }
    }
  };
  const plural = {
    input: "2 " + unit + "s",
    output: {
      measurement: {
        unit: abbr
      }
    }
  };
  const abbreviation = {
    input: "3 " + abbr,
    output: {
      measurement: {
        unit: abbr
      }
    }
  };
  return {
    run: () => {
      expect(parseAmount(singular.input)).toMatchObject(singular.output);
      if (!options.pluralSameSpelling) {
        expect(parseAmount(plural.input)).toMatchObject(plural.output);
      }
      if (commonAbbreviations) {
        _.forEach(commonAbbreviations, function (_abbr) {
          const input = "4 " + _abbr;
          expect(parseAmount(input)).toMatchObject({ 
            measurement: {
              unit: abbr,
            }
          });
        })
      } else {
        expect(parseAmount(abbreviation.input)).toMatchObject(abbreviation.output);
      }
    }
  }
}