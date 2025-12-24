import { describe, expect, test } from "@jest/globals";
import functions from "./NOunceUnit"

describe("isSupportedUnitType", () => {
  const { isSupportedUnitType } = functions;
  test("should identify NOunceUnit", () => {
    expect(isSupportedUnitType({ ounce: 5 })).toBeTruthy();
    expect(isSupportedUnitType({})).toBeFalsy();
    expect(isSupportedUnitType(null)).toBeFalsy();
    expect(isSupportedUnitType(undefined)).toBeFalsy();
  });
});

describe("areUnitsConvertible", () => {
const { areUnitsConvertible } = functions;
  test("when both are NOunceUnit should return true", () => {
    const result = areUnitsConvertible({ ounce: 10 }, { ounce: 20 });
    expect(result).toBeTruthy();
  });
  test("when one is not NOunceUnit should return false", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    expect(areUnitsConvertible({ ounce: 10 }, "ounce" as any)).toBeFalsy();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    expect(areUnitsConvertible("ounce" as any, { ounce: 20 })).toBeFalsy();
  });
});

describe("convert", () => {
  const { convert } = functions;
  test("given 5 units of 10-ounce when convert to 20-ounce should return 2.5", () => {
    const result = convert(5, { ounce: 10 }, { ounce: 20 });
    expect(result).toBe(2.5);
  });
});

describe("canParse", () => {
  const { canParse } = functions;
  test("'3-ounce' should return true", () => {
    expect(canParse("3-ounce")).toBeTruthy();
  });
  test("'3-ounce fillet' should return true", () => {
    expect(canParse("3-ounce fillet")).toBeTruthy();
  });
  test("invalid text should return false", () => {
    expect(canParse("3 ounce")).toBeFalsy();
    expect(canParse("ounce")).toBeFalsy();
    expect(canParse("")).toBeFalsy();
    expect(canParse(undefined)).toBeFalsy();
  });
});

describe("parse", () => {
  const { parse } = functions;
  test("'5-ounce' should return ounce of 5", () => {
    expect(parse("5-ounce")).toMatchObject({ ounce: 5 });
  });
  test("'10-ounce fillet' should return ounce of 10", () => {
    expect(parse("10-ounce fillet")).toMatchObject({ ounce: 10 });
  });
});