import parseFoodDescription from "./foodDescription";

test("parse 'brocoli 1 cup'", () => {
  expect(parseFoodDescription("brocoli 1 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1 cup",
      measurement: {
        quantity: 1,
        unitText: "cup",
        quantityText: "1",
      },
    }
  );
})

test("parse 'brocoli cooked 1 cup'", () => {
  expect(parseFoodDescription("brocoli cooked 1 cup")).toMatchObject(
    {
      foodName: "brocoli cooked",
      amount: "1 cup",
      measurement: {
        quantity: 1,
        unitText: "cup"
      }
    }
  );
})

test("parse 'brocoli cooked 2 cups'", () => {
  expect(parseFoodDescription("brocoli cooked 2 cups")).toMatchObject(
    {
      foodName: "brocoli cooked",
      amount: "2 cups",
      measurement: {
        quantity: 2,
        unitText: "cups"
      }
    }
  );
})

test("case sensitive unit name 'Cup'", () => {
  expect(parseFoodDescription("brocoli cooked 1 Cup")).toMatchObject(
    {
      foodName: "brocoli cooked",
      amount: "1 Cup",
      measurement: {
        quantity: 1,
        unitText: "Cup"
      }
    }
  );
})

test("food name only", () => {
  expect(parseFoodDescription("brocoli cooked")).toMatchObject(
    {
      foodName: "brocoli cooked"
    }
  );
})

test("contain un-parsable char", () => {
  expect(parseFoodDescription("brocoli cooked ~")).toMatchObject(
    {
      foodName: "brocoli cooked",
      hasError: true
    }
  );
})

test("empty string", () => {
  expect(parseFoodDescription("")).toMatchObject(
    {
      foodName: ""
    }
  );
})

test("unit 'small'", () => {
  expect(parseFoodDescription("banana 1 small")).toMatchObject(
    {
      foodName: "banana",
      amount: "1 small",
      measurement: {
        quantity: 1,
        unitText: "small"
      }
    }
  );
})

test("decimal quantity e.g. 0.5", () => {
  expect(parseFoodDescription("brocoli 0.5 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "0.5 cup",
      measurement: {
        quantity: 0.5,
        unitText: "cup"
      }
    }
  );
})

test("decimal quantity, no leading zero e.g. .5", () => {
  expect(parseFoodDescription("brocoli .5 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: ".5 cup",
      measurement: {
        quantity: 0.5,
        unitText: "cup"
      }
    }
  );
})

test("words following unit, e.g. 'brocoli 1 cup cooked', then amount should be '1 cup cooked'", () => {
  expect(parseFoodDescription("brocoli 1 cup cooked")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1 cup cooked",
      measurement: {
        quantity: 1,
        unitText: "cup cooked"
      }
    }
  );
})

test("fraction quantity e.g. 1/2", () => {
  expect(parseFoodDescription("brocoli 1/2 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1/2 cup",
      measurement: {
        quantity: 0.5,
        unitText: "cup",
        quantityText: "1/2",
      }
    }
  );
})

test("fraction quantity e.g. '1 1/2'", () => {
  expect(parseFoodDescription("brocoli 1 1/2 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1 1/2 cup",
      measurement: {
        quantity: 1.5,
        unitText: "cup",
        quantityText: "1 1/2",
      }
    }
  );
})

test("fraction quantity, do not round, keep maximum precision", () => {
  expect(parseFoodDescription("brocoli 2/3 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "2/3 cup",
      measurement: {
        quantity: 0.6666666666666666,
        unitText: "cup"
      }
    }
  );
})

test("unit pound -> lb", () => {
  expect(parseFoodDescription("beef 1 pound")).toMatchObject(
    {
      foodName: "beef",
      amount: "1 pound",
      measurement: {
        quantity: 1,
        unitText: "pound"
      }
    }
  );
})

test("unit ounce -> oz", () => {
  expect(parseFoodDescription("beef 1 ounce")).toMatchObject(
    {
      foodName: "beef",
      amount: "1 ounce",
      measurement: {
        quantity: 1,
        unitText: "ounce"
      }
    }
  );
})

test("plural unit ounces -> oz", () => {
  expect(parseFoodDescription("beef 2 ounces")).toMatchObject(
    {
      foodName: "beef",
      amount: "2 ounces",
      measurement: {
        quantity: 2,
        unitText: "ounces"
      }
    }
  );
})

test("alternate measurement, takes only the first one", () => {
  expect(parseFoodDescription("orange 3/4 cup or 1 medium")).toMatchObject(
    {
      foodName: "orange",
      amount: "3/4 cup or",
      measurement: {
        quantity: 0.75,
        unitText: "cup or",
      }
    }
  );
})

test("parenthesis in unit", () => {
  expect(parseFoodDescription("Muffin 1 large (4 ounces)")).toMatchObject(
    {
      foodName: "Muffin",
      amount: "1 large (4 ounces)",
      measurement: {
        quantity: 1,
        unitText: "large (4 ounces)",
      }
    }
  );
})

test("parenthesis in unit includes /", () => {
  expect(parseFoodDescription("Fruit leather pieces 1 pack (3/4 ounce)")).toMatchObject(
    {
      foodName: "Fruit leather pieces",
      amount: "1 pack (3/4 ounce)",
      measurement: {
        quantity: 1,
        unitText: "pack (3/4 ounce)",
      }
    }
  );
})

test("parenthesis in unit with no content", () => {
  expect(parseFoodDescription("Muffin 1 large (")).toMatchObject(
    {
      foodName: "Muffin",
      amount: "1 large (",
      measurement: {
        unitText: "large (",
      }
    }
  );
})