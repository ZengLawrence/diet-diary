import { describe, expect, test } from "@jest/globals";
import functions from "./NOunceUnit"

const { isSupportedUnitType } = functions;

describe("isSupportedUnitType", () => {
  test("should identify NOunceUnit", () => {
    expect(isSupportedUnitType({ ounce: 5 })).toBeTruthy();
    expect(isSupportedUnitType({})).toBeFalsy();
    expect(isSupportedUnitType(null)).toBeFalsy();
    expect(isSupportedUnitType(undefined)).toBeFalsy();
  });
});

const { areUnitsConvertible } = functions;
describe("areUnitsConvertible", () => {
  test("when both are NOunceUnit should return true", () => {
    const result = areUnitsConvertible({ ounce: 10 }, { ounce: 20 });
    expect(result).toBeTruthy();
  });
  test("when one is not NOunceUnit should return false", () => {
    expect(areUnitsConvertible({ ounce: 10 }, "ounce" as any)).toBeFalsy();
    expect(areUnitsConvertible("ounce" as any, { ounce: 20 })).toBeFalsy();
  });
});