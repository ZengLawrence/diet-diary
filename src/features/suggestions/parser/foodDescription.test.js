import { parseFoodDescription } from "./foodDescription";

test("parse 'brocoli 1 cup'", () => {
  expect(parseFoodDescription("brocoli 1 cup")).toMatchObject(
    {
      foodName: "brocoli",
      measurement: { 
        quantity: "1",
        unit: "cup"
      }
    }
  );
})

test("parse 'brocoli cooked 1 cup'", () => {
  expect(parseFoodDescription("brocoli cooked 1 cup")).toMatchObject(
    {
      foodName: "brocoli cooked",
      measurement: { 
        quantity: "1",
        unit: "cup"
      }
    }
  );
})

test("parse 'brocoli cooked 2 cups'", () => {
  expect(parseFoodDescription("brocoli cooked 2 cups")).toMatchObject(
    {
      foodName: "brocoli cooked",
      measurement: { 
        quantity: "2",
        unit: "cups"
      }
    }
  );
})

test("case insensitive unit name 'Cup' instead of 'cup'", () => {
  expect(parseFoodDescription("brocoli cooked 1 Cup")).toMatchObject(
    {
      foodName: "brocoli cooked",
      measurement: { 
        quantity: "1",
        unit: "cup"
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