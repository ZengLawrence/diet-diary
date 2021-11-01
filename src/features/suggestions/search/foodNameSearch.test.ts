import _ from "lodash";
import { findNameSuggestions, findSuggestions } from "./foodNameSearch";

// search for serving
test("search for exact name e.g. Broccoli should return at least one row and first row is Broccoli", () => {
  const results = findSuggestions("Broccoli");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Broccoli" });
})

test("case insensitive search e.g. broccoli should return at least one row and first row is Broccoli", () => {
  const results = findSuggestions("broccoli");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Broccoli" });
})

test("search term appears in the beginning of name e.g. oatmeal should return at least one row and first row is 'Oatmeal, with water, unsweetened'", () => {
  const results = findSuggestions("oatmeal");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Oatmeal, with water, unsweetened" });
})

test("exact search term appears in the middle of name e.g. peanuts should return at least one row and first row is 'Nuts, peanuts'", () => {
  const results = findSuggestions("peanuts");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Nuts, peanuts" });
})

test("misspelled e.g. peanus should return at least one row and first row is 'Nuts, peanuts'", () => {
  const results = findSuggestions("peanus");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Nuts, peanuts" });
})

test("drop last word - last search term not found e.g. 'coconut chew' should return at least one row and first row is 'Coconut, shredded, sweetened'", () => {
  const results = findSuggestions("coconut chew");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Coconut, shredded, sweetened" });
})

test("search term appears exactly in the name e.g. 'Corn on the cob' should return at least one row and first row is 'Corn on the cob'", () => {
  const results = findSuggestions("Corn on the cob");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Corn on the cob" });
})

test("search term appears in the second node in the name e.g. 'salmon' in 'Fish, Atlantic salmon, grilled or boiled' should return that row", () => {
  const results = findSuggestions("salmon");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Fish, Atlantic salmon, grilled or boiled" });
})

test("search term appears in different order as in the list e.g. 'Italian salad dressing fat free' in 'Salad dressing, Italian, fat-free' should return that row", () => {
  const results = findSuggestions("Italian salad dressing fat free");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Salad dressing, Italian, fat-free" });
})

test("search for exact name for portion e.g. 'Caesar salad' should return 'Caesar salad with grilled chicken'", () => {
  const results = findSuggestions("Caesar salad");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Caesar salad with grilled chicken" });
})

test("search for 'peanut butter' should return 'peanut butter' as first result", () => {
  const results = findSuggestions("peanut butter");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Peanut butter, chunky or smooth" });
})

test("search for 'skim milk' should return 'Milk, skim or 1%' as first result", () => {
  const results = findSuggestions("skim milk");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Milk, skim or 1%" });
})

// this example will have to be handled when generating suggestion
test("search for 'chocolate whole milk' should return 'chocolate milk' and 'whole milk' in top 3 results", () => {
  const results = findSuggestions("chocolate whole milk");
  expect(_.size(results)).toBeGreaterThanOrEqual(3);
  expect(results[0]).toMatchObject({ foodName: "Chocolate bar, milk" });
  expect(results[1]).toMatchObject({ foodName: "Milk, 2% or whole" });
  expect(results[2]).toMatchObject({ foodName: "Chocolate milk, made with skim or 1% milk" });
})

// auto complete food name
test("auto complete food name for a partial name e.g. 'brocco' should return 'broccoli'", () => {
  const results = findNameSuggestions("brocco");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ foodName: "broccoli" });
})

test("auto complete food name for a partial name with first letter capitalized e.g. 'Brocco' should return keep same case in suggestion e.g. 'Broccoli'", () => {
  const results = findNameSuggestions("Brocco");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ foodName: "Broccoli" });
})

test("auto complete food name for multiple word name e.g. 'peanut butt' should return 'peanut butter'", () => {
  const results = findNameSuggestions("peanut butt");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ foodName: "peanut butter" });
})
