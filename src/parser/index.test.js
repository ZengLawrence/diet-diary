import { parseFoodDescription } from ".";

test("parse 'brocoli 1 cup'", () => {
  expect(parseFoodDescription("brocoli 1 cup")).toMatchObject(
    {
      foodName: "brocoli",
      measurement: { 
        number: "1",
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
        number: "1",
        unit: "cup"
      }
    }
  );
})