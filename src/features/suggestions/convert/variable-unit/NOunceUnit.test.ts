import { expect, test } from "@jest/globals";
import functions from "./NOunceUnit"

const { isSupportedUnitType } = functions;

test("isSupportedUnitType should identify NOunceUnit", () => {
  expect(isSupportedUnitType({ ounce: 5 })).toBeTruthy();
  expect(isSupportedUnitType({})).toBeFalsy();
  expect(isSupportedUnitType(null)).toBeFalsy();
  expect(isSupportedUnitType(undefined)).toBeFalsy();
});

