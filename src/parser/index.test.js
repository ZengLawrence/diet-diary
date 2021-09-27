import { parseFoodDescription } from ".";

test("brocoli 1 cup", () => {
  expect(parseFoodDescription("brocoli 1 cup")).toMatchObject(
    {
      foodName: "brocoli",
      measurement: { number: "1" }
    }
  );
})