import { isConvertible } from "./Unit";

test("units are convertible", () => {
  expect(isConvertible("fl-oz", "cup")).toBeTruthy();
})

test("units are not convertible", () => {
  expect(isConvertible("cup", "oz")).toBeFalsy();
})
