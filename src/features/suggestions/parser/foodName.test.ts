import _ from "lodash";
import { foodName } from "./foodName";

test("search for proper formatted food description '<food name> <serving size>' e.g. 'banana 1 small'", () => {
  expect(foodName("banana 1 small")).toBe("banana");
})

test("search for food description with serving size but no unit e.g. 'banana 1'", () => {
  expect(foodName("banana 1")).toBe("banana");
})

test("search for food description with no serving size e.g. 'banana'", () => {
  expect(foodName("banana")).toBe("banana");
})

test("search for food description with number in its name e.g. '1% milk 1 cup'", () => {
  expect(foodName("1% milk 1 cup")).toBe("1% milk");
})

test("search for food description with number in its name e.g. 'milk 1% 1 cup'", () => {
  expect(foodName("milk 1% 1 cup")).toBe("milk 1%");
})

test("search for food description with comma ',' in its name e.g. 'Nuts, peanuts'", () => {
  expect(foodName("Nuts, peanuts 8 wholes")).toBe("Nuts, peanuts");
})