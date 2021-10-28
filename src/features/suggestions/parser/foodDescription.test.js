import { parseFoodDescription } from "./foodDescription";

test("parse 'brocoli 1 cup'", () => {
  expect(parseFoodDescription("brocoli 1 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1 cup",
      quantity: 1,
      unitText: "cup"
    }
  );
})

test("parse 'brocoli cooked 1 cup'", () => {
  expect(parseFoodDescription("brocoli cooked 1 cup")).toMatchObject(
    {
      foodName: "brocoli cooked",
      amount: "1 cup",
      quantity: 1,
      unitText: "cup"
    }
  );
})

test("parse 'brocoli cooked 2 cups'", () => {
  expect(parseFoodDescription("brocoli cooked 2 cups")).toMatchObject(
    {
      foodName: "brocoli cooked",
      amount: "2 cups",
      quantity: 2,
      unitText: "cups"
    }
  );
})

test("case sensitive unit name 'Cup'", () => {
  expect(parseFoodDescription("brocoli cooked 1 Cup")).toMatchObject(
    {
      foodName: "brocoli cooked",
      amount: "1 Cup",
      quantity: 1,
      unitText: "Cup"
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
      quantity: 1,
      unitText: "small"
    }
  );
})

test("decimal quantity e.g. 0.5", () => {
  expect(parseFoodDescription("brocoli 0.5 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "0.5 cup",
      quantity: 0.5,
      unitText: "cup"
    }
  );
})

test("decimal quantity, no leading zero e.g. .5", () => {
  expect(parseFoodDescription("brocoli .5 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: ".5 cup",
      quantity: 0.5,
      unitText: "cup"
    }
  );
})

test("words following unit, e.g. 'brocoli 1 cup cooked', then amount should be '1 cup cooked'", () => {
  expect(parseFoodDescription("brocoli 1 cup cooked")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1 cup cooked",
      quantity: 1,
      unitText: "cup cooked"
    }
  );
})

test("fraction quantity e.g. 1/2", () => {
  expect(parseFoodDescription("brocoli 1/2 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1/2 cup",
      quantity: 0.5,
      unitText: "cup"
    }
  );
})

test("fraction quantity e.g. '1 1/2'", () => {
  expect(parseFoodDescription("brocoli 1 1/2 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1 1/2 cup",
      quantity: 1.5,
      unitText: "cup"
    }
  );
})

test("fraction quantity round to 3 decimal places e.g. 2/3 to 0.667", () => {
  expect(parseFoodDescription("brocoli 2/3 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "2/3 cup",
      quantity: 0.667,
      unitText: "cup"
    }
  );
})

test("unit pound -> lb", () => {
  expect(parseFoodDescription("beef 1 pound")).toMatchObject(
    {
      foodName: "beef",
      amount: "1 pound",
      quantity: 1,
      unitText: "pound"
    }
  );
})

test("unit ounce -> oz", () => {
  expect(parseFoodDescription("beef 1 ounce")).toMatchObject(
    {
      foodName: "beef",
      amount: "1 ounce",
      quantity: 1,
      unitText: "ounce"
    }
  );
})

test("plural unit ounces -> oz", () => {
  expect(parseFoodDescription("beef 2 ounces")).toMatchObject(
    {
      foodName: "beef",
      amount: "2 ounces",
      quantity: 2,
      unitText: "ounces"
    }
  );
})
