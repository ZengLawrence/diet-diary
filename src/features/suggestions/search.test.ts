import _ from "lodash";
import { searchFoodServingSize } from "./search";

test("search for exact name e.g. Broccoli should return exact one row", () => {
  const results = searchFoodServingSize("Broccoli");
  expect(_.size(results)).toBe(1);
  expect(results[0]).toMatchObject({ "foodName": "Broccoli" });
})

test("case insensitive search e.g. broccoli should return exact one row", () => {
  const results = searchFoodServingSize("broccoli");
  expect(_.size(results)).toBe(1);
  expect(results[0]).toMatchObject({ "foodName": "Broccoli" });
})

test("search term appears in the beginning of name e.g. oatmeal should return exact one row", () => {
  const results = searchFoodServingSize("oatmeal");
  expect(_.size(results)).toBe(1);
  expect(results[0]).toMatchObject({ "foodName": "Oatmeal, with water, unsweetened" });
})

test("exact search term appears in the middle of name e.g. peanuts should return exact one row", () => {
  const results = searchFoodServingSize("peanuts");
  expect(_.size(results)).toBe(1);
  expect(results[0]).toMatchObject({ "foodName": "Nuts, peanuts" });
})