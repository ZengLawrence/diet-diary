import { expect, test } from "@jest/globals";
import configureMeasurements from "convert-units";
import unknown from "./UnknownUnit";

const convert = configureMeasurements({unknown});

test("convert unknown unit", () => {
  const result = convert(1).from("unknown").to("unknown");
  expect(result).toBe(1);
})
