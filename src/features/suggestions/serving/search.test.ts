import _ from "lodash";
import { searchFoodServingSize } from "./search";

test("search for exact name e.g. Broccoli should return at least one row and first row is Broccoli", () => {
  const results = searchFoodServingSize("Broccoli");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Broccoli" });
})

test("case insensitive search e.g. broccoli should return at least one row and first row is Broccoli", () => {
  const results = searchFoodServingSize("broccoli");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Broccoli" });
})

test("search term appears in the beginning of name e.g. oatmeal should return at least one row and first row is 'Oatmeal, with water, unsweetened'", () => {
  const results = searchFoodServingSize("oatmeal");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Oatmeal, with water, unsweetened" });
})

test("exact search term appears in the middle of name e.g. peanuts should return at least one row and first row is 'Nuts, peanuts'", () => {
  const results = searchFoodServingSize("peanuts");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Nuts, peanuts" });
})

test("misspelled e.g. peanus should return at least one row and first row is 'Nuts, peanuts'", () => {
  const results = searchFoodServingSize("peanus");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Nuts, peanuts" });
})

test("drop last word - last search term not found e.g. 'coconut chew' should return at least one row and first row is 'Coconut, shredded, sweetened'", () => {
  const results = searchFoodServingSize("coconut chew");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Coconut, shredded, sweetened" });
})

test("search term appears exactly in the name e.g. 'Corn on the cob' should return at least one row and first row is 'Corn on the cob'", () => {
  const results = searchFoodServingSize("Corn on the cob");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Corn on the cob" });
})

test("search term appears in the second node in the name e.g. 'salmon' in 'Fish, Atlantic salmon, grilled or boiled' should return that row", () => {
  const results = searchFoodServingSize("salmon");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Fish, Atlantic salmon, grilled or boiled" });
})