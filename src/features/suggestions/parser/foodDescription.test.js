import { parseFoodDescription } from "./foodDescription";

test("parse 'brocoli 1 cup'", () => {
  expect(parseFoodDescription("brocoli 1 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1 cup",
      quantity: "1",
      unit: "cup"
    }
  );
})

test("parse 'brocoli cooked 1 cup'", () => {
  expect(parseFoodDescription("brocoli cooked 1 cup")).toMatchObject(
    {
      foodName: "brocoli cooked",
      amount: "1 cup",
      quantity: "1",
      unit: "cup"
    }
  );
})

test("parse 'brocoli cooked 2 cups'", () => {
  expect(parseFoodDescription("brocoli cooked 2 cups")).toMatchObject(
    {
      foodName: "brocoli cooked",
      amount: "2 cups",
      quantity: "2",
      unit: "cups"
    }
  );
})

test("case insensitive unit name 'Cup' instead of 'cup'", () => {
  expect(parseFoodDescription("brocoli cooked 1 Cup")).toMatchObject(
    {
      foodName: "brocoli cooked",
      amount: "1 Cup",
      quantity: "1",
      unit: "cup"
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
      quantity: "1",
      unit: "small"
    }
  );
})

test("decimal unit e.g. 0.5", () => {
  expect(parseFoodDescription("brocoli 0.5 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "0.5 cup",
      quantity: "0.5",
      unit: "cup"
    }
  );
})

test("decimal unit, no leading zero e.g. .5", () => {
  expect(parseFoodDescription("brocoli .5 cup")).toMatchObject(
    {
      foodName: "brocoli",
      amount: ".5 cup",
      quantity: ".5",
      unit: "cup"
    }
  );
})

test("words following unit, e.g. 'brocoli 1 cup cooked', then amount should be '1 cup cooked'", () => {
  expect(parseFoodDescription("brocoli 1 cup cooked")).toMatchObject(
    {
      foodName: "brocoli",
      amount: "1 cup cooked",
      quantity: "1",
      unit: "cup"
    }
  );
})
